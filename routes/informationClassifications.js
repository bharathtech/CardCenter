/**
 * Information Classification Routes
 */

'use strict';

var informationClassificationController = require('../controllers/informationClassifications');
var auth = require('../auth');

var routes = function(app) {

	app.get('/informationClassifications', auth.isAuthenticated, informationClassificationController.informationClassifications);

};

module.exports = routes;