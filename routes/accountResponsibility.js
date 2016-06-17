/**
 * Account Responsibility Routes
 */

'use strict';

var accountResponsibilityController = require('../controllers/accountResponsibility');
var auth = require('../auth');

var routes = function(app) {

	// GET
    app.get('/districts', auth.isAuthenticated, accountResponsibilityController.getDistricts);
    app.get('/tmTerritories', auth.isAuthenticated, accountResponsibilityController.getTmTerritories);
    app.get('/tsTerritories', auth.isAuthenticated, accountResponsibilityController.getTsTerritories);
    app.get('/districts/byChain/:chainNum', auth.isAuthenticated, accountResponsibilityController.getDistrictsByChain);
    app.get('/tmTerritories/byChain/:chainNum', auth.isAuthenticated, accountResponsibilityController.getTmTerritoriesByChain);
    app.get('/tsTerritories/byChain/:chainNum', auth.isAuthenticated, accountResponsibilityController.getTsTerritoriesByChain);
    app.get('/tmTerritories/byDistrict/:districtNum', auth.isAuthenticated, accountResponsibilityController.getTmTerritoriesByDistrict);
    app.get('/tsTerritories/byDistrict/:districtNum', auth.isAuthenticated, accountResponsibilityController.getTsTerritoriesByDistrict);
    app.get('/tsTerritories/byTmTerritory/:tmTerritoryNum', auth.isAuthenticated, accountResponsibilityController.getTsTerritoriesByTmTerritory);

};


module.exports = routes;
