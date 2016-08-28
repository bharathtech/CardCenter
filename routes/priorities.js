/**
 * Priority Routes
 */

'use strict';

var prioritiesController = require('../controllers/priorities');
var auth = require('../auth');

var routes = function(app) {

	app.get('/priorities', auth.isAuthenticated, prioritiesController.priorities);

};

module.exports = routes;