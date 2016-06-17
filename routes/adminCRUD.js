/**
 * Admin CRUD Routes
 */

'use strict';

var adminCRUDController = require('../controllers/adminCRUD');
var auth = require('../auth');

var routes = function(app) {

	// READ TABLES
    app.get('/adminCRUD/adminTableToEditFields/:tableID', auth.isAuthenticated, adminCRUDController.readAdminTableToEditFields);
    app.get('/adminCRUD/READ/:tableName', auth.isAuthenticated, adminCRUDController.readAdminTables);
    app.get('/adminCRUD/READ/:tableName/:whereField/:whereValue', auth.isAuthenticated, adminCRUDController.readAdminTablesWithParam);

    // UPDATE TABLES
    app.get('/adminCRUD/UPDATE/:tableName', auth.isAuthenticated, adminCRUDController.updateAdminTables);

    // DELETE RECORDS FROM TABLES
    app.get('/adminCRUD/DELETE/:tableName', auth.isAuthenticated, adminCRUDController.deleteAdminTableRecords);

    // INSERT RECORDS INTO TABLES
    app.get('/adminCRUD/INSERT/:tableName', auth.isAuthenticated, adminCRUDController.insertAdminTableRecords)
};

module.exports = routes;
