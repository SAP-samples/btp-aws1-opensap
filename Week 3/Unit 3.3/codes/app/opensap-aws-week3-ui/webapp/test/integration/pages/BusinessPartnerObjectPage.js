sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'opensapawsweek3ui',
            componentId: 'BusinessPartnerObjectPage',
            entitySet: 'BusinessPartner'
        },
        CustomPageDefinitions
    );
});