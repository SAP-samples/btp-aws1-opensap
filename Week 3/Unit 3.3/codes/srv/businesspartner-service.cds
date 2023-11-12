using com.opensap.week3 as db from '../db/data-model';

service BusinessPartnerService @(requires: 'authenticated-user'){

    // Fetch From HANA Cloud DB
    @odata.draft.enabled
    entity BusinessPartner @(restrict: [
        {
            grant: ['READ'],
            to   : ['BusinessPartnerViewer']
        },
        {
            grant: ['READ', 'UPDATE'],
            to   : ['BusinessPartnerValidator']
        }
    ]) as projection on db.A_BusinessPartner;

    entity BusinessPartnerAddress @(restrict: [
        {
            grant: ['READ'],
            to   : ['BusinessPartnerViewer']
        },
        {
            grant: ['READ', 'UPDATE'],
            to   : ['BusinessPartnerValidator']
        }
    ]) as projection on db.A_BusinessPartnerAddress;
}