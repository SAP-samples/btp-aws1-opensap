sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'opensapawsweek3ui/test/integration/FirstJourney',
		'opensapawsweek3ui/test/integration/pages/BusinessPartnerList',
		'opensapawsweek3ui/test/integration/pages/BusinessPartnerObjectPage'
    ],
    function(JourneyRunner, opaJourney, BusinessPartnerList, BusinessPartnerObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('opensapawsweek3ui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBusinessPartnerList: BusinessPartnerList,
					onTheBusinessPartnerObjectPage: BusinessPartnerObjectPage
                }
            },
            opaJourney.run
        );
    }
);