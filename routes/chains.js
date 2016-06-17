/**
 * Chain Information Routes
 */

'use strict';

var chainController = require('../controllers/chains');
var auth = require('../auth');

var routes = function(app) {

	// GET a list of all chains
	app.get('/chains', chainController.listChains);

};

module.exports = routes;