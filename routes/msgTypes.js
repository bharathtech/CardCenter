/**
 * Message Type Routes
 */

'use strict';

var messageTypesController = require('../controllers/msgTypes');
var auth = require('../auth');

var routes = function(app) {

	app.get('/msgTypes', auth.isAuthenticated, messageTypesController.msgTypes);

};

module.exports = routes;