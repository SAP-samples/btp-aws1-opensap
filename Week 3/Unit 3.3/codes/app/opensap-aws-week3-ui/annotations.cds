using BusinessPartnerService as service from '../../srv/businesspartner-service';

// Below code define the UI behaviour on the Business Partner CDS Domain model
annotate service.BusinessPartner with {

    BusinessPartner    @(Common.Label: 'Business Partner ID') @readonly;
    BusinessPartnerName @(Common.Label: 'Business Partner Name') @readonly;
    BusinessPartnerFullName @(Common.Label: 'Business Partner Full Name') @readonly;
    FirstName          @(Common.Label: 'First Name') @readonly;
    LastName           @(Common.Label: 'Last Name') @readonly;
    verificationStatus @(Common: {
        Label       : 'Verification Status',
        ValueList   : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'StatusValues',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: verificationStatus_code,
                    ValueListProperty: 'code'
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'value'
                }
            ]
        },
        ValueListWithFixedValues,
        FieldControl: #Mandatory
    });
}

annotate service.BusinessPartner with @(

    UI          : {

        // SelectionFields define the filter bar on the List Page
        SelectionFields            : [
            BusinessPartner,
            FirstName,
            LastName,
            verificationStatus_code
        ],

        //Line Item define the columns shows in the List page table
        LineItem                   : [
            {
                $Type                : 'UI.DataField',
                Label                : 'Business Partner',
                Value                : BusinessPartner,
                ![@HTML5.CssDefaults]: {width: '25%'}
            },
            {
                $Type                : 'UI.DataField',
                Label                : 'First Name',
                Value                : FirstName,
                ![@HTML5.CssDefaults]: {width: '25%'}
            },
            {
                $Type                : 'UI.DataField',
                Label                : 'Last Name',
                Value                : LastName,
                ![@HTML5.CssDefaults]: {width: '25%'}
            },
            {
                $Type                : 'UI.DataField',
                Label                : 'Verification Status',
                Value                : verificationStatus.value,
                ![@HTML5.CssDefaults]: {width: '25%'}
            }
        ],

        // Header Info Define the tilte and desciption of the CDS domain model in the object page
        HeaderInfo                 : {
            $Type         : 'UI.HeaderInfoType',
            TypeName      : 'Business Partner',
            TypeNamePlural: 'BusinessPartner',
            Title         : {
                $Type: 'UI.DataField',
                Value: BusinessPartner
            },
            Description   : {
                $Type: 'UI.DataField',
                Value: 'Standard Business Partner'
            }
        },

        // HeaderFacets define which information is displayed in the header
        HeaderFacets               : [
            {
                $Type : 'UI.ReferenceFacet',
                ID    : 'BusinessPartnerName',
                Target: '@UI.DataPoint#BPName'
            },
            {
                $Type : 'UI.ReferenceFacet',
                ID    : 'BusinessPartnerFullName',
                Target: '@UI.DataPoint#BPFullName'
            },
            {
                $Type : 'UI.ReferenceFacet',
                ID    : 'BusinessPartnerIsBlocked',
                Target: '@UI.DataPoint#BPIsBlock'
            }
        ],

        DataPoint #BPName          : {
            $Type: 'UI.DataPointType',
            Value: BusinessPartnerName,
            Title: 'Name'
        },

        DataPoint #BPFullName      : {
            $Type: 'UI.DataPointType',
            Value: BusinessPartnerFullName,
            Title: 'Full Name'
        },

        DataPoint #BPIsBlock       : {
            $Type: 'UI.DataPointType',
            Value: BusinessPartnerIsBlocked,
            Title: 'Central Block'
        },

        // Below code Define the 'General Information' facts in the object page
        Facets                     : [
            {
                $Type : 'UI.ReferenceFacet',
                ID    : 'GeneratedFacet1',
                Label : 'General Information',
                Target: '@UI.FieldGroup#GeneratedGroup1',
            },
            {
                $Type : 'UI.ReferenceFacet',
                ID    : 'AddressFacet',
                Label : 'Addresses',
                Target: 'to_BusinessPartnerAddress/@UI.LineItem'
            },
        ],

        FieldGroup #GeneratedGroup1: {
            $Type: 'UI.FieldGroupType',
            Data : [
                {
                    $Type: 'UI.DataField',
                    Label: 'Business Partner',
                    Value: BusinessPartner,
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Business Partner Name',
                    Value: BusinessPartnerName,
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Business Partner Full Name',
                    Value: BusinessPartnerFullName,
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'First Name',
                    Value: FirstName,
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Last Name',
                    Value: LastName,
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Business Partner Central Blocked',
                    Value: BusinessPartnerIsBlocked,
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Verification Sttaus',
                    Value: verificationStatus_code,
                },
            ],
        },
    },
    // Below code define the CRUD ability of the Business Partner CDS Model
    Capabilities: {
        Updatable : true,
        Deletable : true,
        Insertable: false,
    },
);

// Below code define the UI behaviour on the CDS Domain model
annotate service.BusinessPartnerAddress with {

    BusinessPartner  @(Common.Label: 'Business Partner ID')  @readonly;
    AddressID        @(Common.Label: 'Address ID')           @readonly;
    StreetName       @(Common.Label: 'Street Name');
    HouseNumber      @(Common.Label: 'House Number');
    PostalCode       @(Common.Label: 'Postcal Code');
    CityName         @(Common.Label: 'City Name');
    Country          @(Common.Label: 'Country');
    isModified       @(Common.Label: 'Modified ?');
};

// Below code define the to_BusinessPartnerAddress facets columns
annotate service.BusinessPartnerAddress with @(

UI: {LineItem: [
    {
        $Type                : 'UI.DataField',
        Label                : 'Address ID',
        Value                : AddressID,
        ![@HTML5.CssDefaults]: {width: '14.2%'}
    },
    {
        $Type                : 'UI.DataField',
        Label                : 'Business Partner ID',
        Value                : BusinessPartner_BusinessPartner,
        ![@HTML5.CssDefaults]: {width: '14.2%'}
    },
    {
        $Type                : 'UI.DataField',
        Label                : 'Street Name',
        Value                : StreetName,
        ![@HTML5.CssDefaults]: {width: '14.2%'}
    },
    {
        $Type                : 'UI.DataField',
        Label                : 'House Number',
        Value                : HouseNumber,
        ![@HTML5.CssDefaults]: {width: '14.2%'}
    },
    {
        $Type                : 'UI.DataField',
        Label                : 'Postcal Code',
        Value                : PostalCode,
        ![@HTML5.CssDefaults]: {width: '14.2%'}
    },
    {
        $Type                : 'UI.DataField',
        Label                : 'City Name',
        Value                : CityName,
        ![@HTML5.CssDefaults]: {width: '14.2%'}
    },
    {
        $Type                : 'UI.DataField',
        Label                : 'Country',
        Value                : Country,
        ![@HTML5.CssDefaults]: {width: '14.2%'}
    },
    {
        $Type                : 'UI.DataField',
        Label                : 'Is Modified',
        Value                : isModified,
        ![@HTML5.CssDefaults]: {width: '14.2%'}
    }
], });

annotate service.BusinessPartnerAddress with @Capabilities: {

    Deletable : false,
    Insertable: false,
    Updatable : true,
};