/**
 * Position Routes
 */

'use strict';

var positionsController = require('../controllers/positions');
var auth = require('../auth');

var routes = function(app) {

	app.get('/positions/:excludedPositions', auth.isAuthenticated, positionsController.positionsByExclusion);

};

module.exports = routes;