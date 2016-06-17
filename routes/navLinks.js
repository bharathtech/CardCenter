/**
 * Nav Links Route
 */

'use strict';

var sideBarController = require('../controllers/sideBar');
var auth = require('../auth');

var routes = function(app) {
	// Read
	app.get('/sidebarnav', auth.isAuthenticated, sideBarController.sideBarNav);
};

module.exports = routes;
