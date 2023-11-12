sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'opensapawsweek3ui',
            componentId: 'BusinessPartnerList',
            entitySet: 'BusinessPartner'
        },
        CustomPageDefinitions
    );
});