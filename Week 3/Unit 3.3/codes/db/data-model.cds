namespace com.opensap.week3;

entity A_BusinessPartner{

    key BusinessPartner: String(10) not null;
    BusinessPartnerName : String;
    BusinessPartnerFullName: String;
    FirstName: String;
    LastName: String;
    BusinessPartnerIsBlocked: Boolean default false;
    verificationStatus: Association to StatusValues;
    to_BusinessPartnerAddress: Composition of many A_BusinessPartnerAddress on to_BusinessPartnerAddress.BusinessPartner = $self;
}

entity A_BusinessPartnerAddress {

    key BusinessPartner: Association to A_BusinessPartner;
    key AddressID: String(10) not null;
    StreetName: String(60);
    HouseNumber: String(10);
    PostalCode: String(10);
    CityName: String(40);
    Country: String(3);
    isModified: Boolean default false;
}

@cds.autoexpose
entity StatusValues {
  key code: String ;
    value: String;
    criticality: Integer;
    updateCode:Boolean;
}