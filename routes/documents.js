/**
 * Documents Routes
 */

'use strict';

var documentsController = require('../controllers/documents');
var auth = require('../auth');

var routes = function(app) {

	// GET documents
    app.get('/documents', auth.isAuthenticated, documentsController.getDocuments);

};

module.exports = routes;
