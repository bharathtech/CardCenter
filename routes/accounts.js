/**
 * Account Information Routes
 */

'use strict';

var accountInfoController = require('../controllers/accounts');
var auth = require('../auth');

var routes = function(app) {

	// Provide account information
	app.get('/accounts', auth.isAuthenticated, accountInfoController.listAccounts);

};

module.exports = routes;