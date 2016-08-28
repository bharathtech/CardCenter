/**
 * Document View Routes
 */

'use strict';

var documentViewController = require('../controllers/documentViews');
var auth = require('../auth');

var routes = function(app) {

	// READ document view(s)
    app.get('/documents/definedMyViews/:userEmail', auth.isAuthenticated, documentViewController.definedMyViews);
    app.get('/documents/roleMyRoleViews/:positionName', auth.isAuthenticated, documentViewController.roleMyRoleViews);
    //app.get('/documents/openSearch/:searchBy/:searchTerm', auth.isAuthenticated, documentViewController.openSearch);
    //app.get('/documents/filteredSearch/:searchBy/:searchTerm', auth.isAuthenticated, documentViewController.filteredSearch);
    app.get('/documents/filterModel/:userEmail/:filterModel', auth.isAuthenticated, documentViewController.filterModel);

    // UPDATE
    app.post('/documents/insertDocumentView', auth.isAuthenticated, documentViewController.insertDocumentView);
    app.post('/documents/resetAView', auth.isAuthenticated, documentViewController.resetAView);
    app.post('/documents/resetAllMyViews/:userEmail', auth.isAuthenticated, documentViewController.resetAllMyViews);
};


module.exports = routes;
