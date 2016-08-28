/**
 * Account Routes
 */

'use strict';

var accountController = require('../controllers/actAccounts');
var auth = require('../auth');

var routes = function(app) {

	// Read
	//app.get('/accounts/READ/:filterJson', accountController.readAccountList);
    //app.get('/accounts/READ/CHAIN', accountController.readChainList);
    //app.get('/accounts/GET/DISTRICT_TM_TS/:chainNum', auth.isAuthenticated, accountController.getDISTRICT_TM_TSFilters);
    //app.get('/accounts/GET/TM_TS/:districtNum', auth.isAuthenticated, accountController.getTM_TSFilters);
    //app.get('/accounts/GET/TS/:tmTerritoryNum', auth.isAuthenticated, accountController.getTSFilters);
    //app.get('/accounts/READ/FILTERS/:distributeByCategoryID/:filterID/:positionList', accountController.readAccountResponsibilityRecipients);

};

module.exports = routes;
