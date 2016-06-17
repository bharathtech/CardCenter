/**
 * MSO Hierarchy Routes
 */

'use strict';

var msoFieldHierarchyController = require('../controllers/msoFieldHierarchy');
var auth = require('../auth');

var routes = function(app) {

	app.get('/msoLevel1s', auth.isAuthenticated, msoFieldHierarchyController.getMsoLevel1s);
    app.get('/msoLevel2s', auth.isAuthenticated, msoFieldHierarchyController.getMsoLevel2s);
    app.get('/msoLevel2s/byLevel1/:level1Email', auth.isAuthenticated, msoFieldHierarchyController.getMsoLevel2sByLevel1);

};

module.exports = routes;