const cds = require('@sap/cds');
const { SELECT, INSERT, UPDATE } = cds.ql;

class BusinessPartnerService extends cds.ApplicationService {

    init() {

        this.before('READ', 'BusinessPartner', async (req) => {
            await fetchAndSyncData(req);
        });

        this.before('UPDATE', 'BusinessPartner', (req) => {
            console.log("Begin Business Partner Verification Code Check");
            if (req.data.verificationStatus_code === null || req.data.verificationStatus_code.length == 0
                || req.data.verificationStatus_code === 'C') {

                return req.error('Cannot Mark As COMPLETED. Please Verify the Buiness Partner Data And Change To VERIFIED First.');
            }
        });

        this.after('UPDATE', 'BusinessPartner', async (req) => {
            await syncData(req);
        });

        return super.init();
    }
}

async function fetchAndSyncData(req) {

    // Connect to the s4-mock-server
    const mockserver = await cds.connect.to('s4_mock_server');

    // Connect to the db
    const db = await cds.connect.to('db');

    // Step 1.  Fetch Validated Business Partner from s4-mock-server
    const bpSelectQry = SELECT.from('A_BusinessPartner', bp => {
        bp('BusinessPartner'),
            bp('BusinessPartnerName'),
            bp('BusinessPartnerFullName'),
            bp('FirstName'),
            bp('LastName'),
            bp('BusinessPartnerIsBlocked'),
            bp.to_BusinessPartnerAddress(addresses => {
                addresses('BusinessPartner'),
                    addresses('AddressID'),
                    addresses('StreetName'),
                    addresses('HouseNumber'),
                    addresses('PostalCode'),
                    addresses('CityName'),
                    addresses('Country')
            })
    }).where('BusinessPartnerIsBlocked=', false);
    const apiResponse = await mockserver.run(bpSelectQry);

    if (!apiResponse) {
        return req.error(500, 's4-mock-server could not reached');
    }

    if (Array.isArray(apiResponse)) {

        await Promise.all(
            apiResponse.map(async (bp) => {

                // Step 2. Insert BP Records (isCentralBlock=false) into HANA DB.
                const bpID = bp.BusinessPartner;
                const selectQry = SELECT.from('com_opensap_week3_A_BusinessPartner').columns('*').where('BusinessPartner=', bpID);
                let entries;
                try {
                    entries = await db.run(selectQry);
                } catch (error) {
                    console.log(error.message);
                }

                if (entries.length === 0) {

                    console.log(`No Entries Found for Business Partner ID ${bpID}, Begin Insert New Entry`);

                    const insertBPStmt = INSERT.into('com_opensap_week3_A_BusinessPartner')
                        .columns('BUSINESSPARTNER', 'BUSINESSPARTNERNAME', 'BUSINESSPARTNERFULLNAME', 'FIRSTNAME', 'LASTNAME', 'BUSINESSPARTNERISBLOCKED', 'VERIFICATIONSTATUS_CODE')
                        .values(bp.BusinessPartner, bp.BusinessPartnerName, bp.BusinessPartnerFullName, bp.FirstName, bp.LastName, bp.BusinessPartnerIsBlocked, 'V');
                    try {
                        await db.run(insertBPStmt);
                        console.log(`Entry of Business Partner ID ${bpID} Insert Successfully`);
                    } catch (error) {
                        console.log("Exception Happens While INsert BP Records into DB");
                        console.log(error.message);
                    }

                    if (bp.to_BusinessPartnerAddress && Array.isArray(bp.to_BusinessPartnerAddress)) {

                        await Promise.all(
                            bp.to_BusinessPartnerAddress.map(async (address) => {

                                console.log(`Begin Insert Address ${address.AddressID} of Business Partner ID ${bpID} into HANA DB`);

                                const insertAddressStmt = INSERT.into('com_opensap_week3_A_BusinessPartnerAddress')
                                    .columns('BUSINESSPARTNER_BUSINESSPARTNER', 'ADDRESSID', 'STREETNAME', 'HOUSENUMBER', 'POSTALCODE', 'CITYNAME', 'COUNTRY', 'ISMODIFIED')
                                    .values(bp.BusinessPartner, address.AddressID, address.StreetName, address.HouseNumber, address.PostcalCode, address.CityName, address.Country, false);

                                try {
                                    await db.run(insertAddressStmt);
                                } catch (error) {
                                    console.log("Exception Happens While INsert BP Address Records into DB");
                                    console.log(error.message);
                                }
                            })
                        );
                    }
                    console.log(`Business Partner with ID ${bpID} records all set in the HANA DB`)
                } else {

                    // Update Business Partner Entries in the DB
                    if (entries[0].VERIFICATIONSTATUS_CODE !== 'P' && entries[0].VERIFICATIONSTATUS_CODE !== 'INV') {

                        console.log(`Entry Found for Business Partner ID ${bpID}, Begin Update Entry`);

                        const updateBPStmt = UPDATE('com_opensap_week3_A_BusinessPartner')
                            .with({

                                BUSINESSPARTNERNAME: bp.BusinessPartnerName,
                                BUSINESSPARTNERFULLNAME: bp.BusinessPartnerFullName,
                                FIRSTNAME: bp.FirstName,
                                LASTNAME: bp.LastName,
                                BUSINESSPARTNERISBLOCKED: bp.BusinessPartnerIsBlocked
                            })
                            .where('BusinessPartner = ', bpID);
                        try {
                            await db.run(updateBPStmt);
                            console.log(`Business Partner ID ${bpID} Main Entry Updates Success`);
                        } catch (error) {
                            console.log("Exception Happends While Updates Business Partner Records in HANA DB");
                            console.log(error.message);
                        }

                        // Update Business Partner Address Entries in the DB
                        if (bp.to_BusinessPartnerAddress && Array.isArray(bp.to_BusinessPartnerAddress)) {

                            await Promise.all(

                                bp.to_BusinessPartnerAddress.map(async (address) => {

                                    console.log(`Begin Update Address ${address.AddressID} entry of Business Partner ID ${bpID}`);

                                    const updateAddressStmt = UPDATE('com_opensap_week3_A_BusinessPartnerAddress')
                                        .with({

                                            STREETNAME: address.StreetName,
                                            HOUSENUMBER: address.HouseNumber,
                                            POSTALCODE: address.PostalCode,
                                            CITYNAME: address.CityName,
                                            COUNTRY: address.Country
                                        })
                                        .where('BUSINESSPARTNER_BUSINESSPARTNER = ', bpID)
                                        .and('ADDRESSID = ', address.AddressID);
                                    try {
                                        await db.run(updateAddressStmt);
                                        console.log(`Address ${address.AddressID} entry of Business Partner ID ${bpID} Updates Success`);
                                    } catch (error) {
                                        console.log("Exception Happens While Update BP Address Records into DB");
                                        console.log(error.message);
                                    }
                                })
                            );
                        }

                        console.log(`Business Partner ID ${bpID} Entry Updating Success`);
                    }
                }
            }));
    }
}

async function syncData(req) {

    const verificationStatus_code = req.verificationStatus_code;
    if (verificationStatus_code !== null && verificationStatus_code.length > 0) {

        // Connect to the s4-mock-server
        const mockserver = await cds.connect.to('s4_mock_server');

        // Connect to the db
        const db = await cds.connect.to('db');

        const bpID = req.BusinessPartner;
        const selectBPStmt = SELECT.from('com_opensap_week3_A_BusinessPartner')
            .columns('*')
            .where('BusinessPartner =', bpID);
        const bpEntry = await db.run(selectBPStmt);

        const selectAddressStmt = SELECT.from('com_opensap_week3_A_BusinessPartnerAddress')
            .columns('*')
            .where('BusinessPartner_BusinessPartner =', bpID);
        const addressEntries = await db.run(selectAddressStmt);

        const updateBPReq = UPDATE('A_BusinessPartner').with({

            BusinessPartnerName: bpEntry[0].BusinessPartnerName,
            BusinessPartnerFullName: bpEntry[0].BUSINESSPARTNERFULLNAME,
            FirstName: bpEntry[0].FIRSTNAME,
            LastName: bpEntry[0].LASTNAME,
            BusinessPartnerIsBlocked: Boolean(bpEntry[0].BUSINESSPARTNERISBLOCKED),

        }).where('BusinessPartner = ', bpID);

        const updateBPResp = await mockserver.run(updateBPReq);
        if (!updateBPResp) {
            return req.error(500, 's4-mock-server could not reached');
        }

        await Promise.all(

            addressEntries.map(async (address) => {

                if (Boolean(address.ISMODIFIED)) {

                    console.log("Business Partner Address Changed.");

                    const updateAddressReq = UPDATE('A_BusinessPartnerAddress')
                        .with({

                            StreetName: address.STREETNAME,
                            HouseNumber: address.HOUSENUMBER,
                            PostalCode: address.POSTALCODE,
                            CityName: address.CITYNAME,
                            Country: address.COUNTRY
                        })
                        .where('BusinessPartner = ', bpID)
                        .and('AddressID = ', address.ADDRESSID);

                    const updateAddressResp = await mockserver.run(updateAddressReq);
                    if (!updateAddressResp) {
                        return req.error(500, 's4-mock-server could not reached');
                    }
                }
            })
        );

        console.log('Business Partner Updates Sync Up with S4 Mock Server');
    }
}

module.exports = BusinessPartnerService