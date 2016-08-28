/**
 * Admin CRUD Controller
 */

'use strict';

var db = require('../config/database');

/**
 * adminCRUD Operations
 *
 */

//-- Get Field data for the Admin table being updated
var readAdminTableToEditFields = function (req, res, next) {

    //var id = 10; //REDO:  hardcoded ATM
    var tableID = req.params.tableID;
    var sql_AdminTableToEditFields = "SELECT TABLE_NAME,COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS a inner join [SOURCE].[DEV_SANDBOX].[admTableList] b on a.TABLE_NAME = b.adminTableName WHERE b.ID = " + tableID +  " AND TABLE_SCHEMA='DEV_SANDBOX'"; //REDO:  this schema will need to match dev/pro
    var AdminTableToEditFields = db.sequelize.query(sql_AdminTableToEditFields);

    AdminTableToEditFields
        .then(function (fields) {
            if (fields) {
                return res.status(200).json({
                    fields: fields
                })
            }
        }).error(function (err) {
            if (err)
                return next(err);
        });
};

//-- Read all the data from an admin table
var readAdminTables = function (req, res, next) {

    var tableName = req.params.tableName;
    //console.log("tableName: " + tableName);
    var modelAdminTableToRead = db[tableName];

    modelAdminTableToRead
        .findAll()
        .then(function (data) {
            if (data) {
                return res.status(200).json(
                    data
                )
            }
        }).error(function (err) {
            if (err)
                return next(err);
        });

};

//-- Read all the data from an admin table with one where parameter
var readAdminTablesWithParam = function (req, res, next) {

    var tableName = req.params.tableName;
    var whereField = req.params.whereField;
    var whereValue = req.params.whereValue;
    //console.log("tableName: " + tableName);

    //-- Build the Values object
    var options = {};
    var whereList = {};
    whereList[whereField] = whereValue;
    options["where"] = whereList;

    var modelAdminTableToRead = db[tableName];

    modelAdminTableToRead
        .findAll(options)
        .then(function (data) {
            if (data) {
                return res.status(200).json(
                    data
                )
            }
        }).error(function (err) {
            if (err)
                return next(err);
        });

};

//-- Update data in an admin table
var updateAdminTables = function (req, res, next) {

    var obj = JSON.parse(req.query.models);
    var keyList = Object.keys(obj[0]);
    //console.log(JSON.stringify(obj));
    var updateByField = keyList[0];
    var updateByValue = obj[0][keyList[0]];
    var tableName = req.params.tableName;
    //-- Build the Values object
    var values = {};
    for (var x=1;x<keyList.length;x++){
        values[keyList[x]] = obj[0][keyList[x]];
    }
    //-- Build the Options Object
    var options = {};
    var whereList = {};
    whereList[updateByField] = updateByValue;
    options["where"] = whereList;

    var modelAdminTableToUpdate = db[tableName];

    modelAdminTableToUpdate
        .update(
        values,options
    ).then(function (data) {
            if (data) {
                return res.status(200).json(
                    data
                )
            }
        })
        .error(function (err) {
            if (err)
                return next(err);
        });
};

//-- Delete records in an admin table
var deleteAdminTableRecords = function (req, res, next) {

    var obj = JSON.parse(req.query.models);
    var keyList = Object.keys(obj[0]);
    //console.log(JSON.stringify(obj));
    var deleteByField = "";
    var deleteByValue = "";
    var tableName = req.params.tableName;
    var modelAdminTableRecordsToDelete = db[tableName];

    //-- Build the Options Object
    var options = {};
    var whereList = {};

    //Kendo Grid appends multiple deletes to the querystring so we must do below:
    for (var x=0;x<obj.length;x++){
        deleteByField = keyList[x];
        deleteByValue = obj[x][keyList[x]];
        whereList[deleteByField] = deleteByValue;
        options["where"] = whereList;

        modelAdminTableRecordsToDelete
            .destroy(
            options
        ).then(function (data) {
                if (data) {
                    return res.status(200).json(
                        data
                    )
                }
            })
            .error(function (err) {
                if (err)
                    return next(err);
            });
    }
};

//-- Insert records into an admin table
var insertAdminTableRecords = function (req, res, next) {

    var obj = JSON.parse(req.query.models);
    var keyList = Object.keys(obj[0]);
    //console.log(JSON.stringify(obj));
    var tableName = req.params.tableName;

    //-- Build the Values object
    var values = {};
    for (var x=1;x<keyList.length;x++){
        values[keyList[x]] = obj[0][keyList[x]];
    }

    var modelAdminTableRecordsToInsert = db[tableName];
    //console.log(JSON.stringify(values));
    modelAdminTableRecordsToInsert
        .build(
        values
    ).save(function (data) {
            if (data) {
                return res.status(200).json(
                    data
                )
            }
        })
        .error(function (err) {
            if (err)
                return next(err);
        });
};

module.exports = {
    readAdminTableToEditFields: readAdminTableToEditFields,
    readAdminTables: readAdminTables,
    readAdminTablesWithParam: readAdminTablesWithParam,
    updateAdminTables: updateAdminTables,
    deleteAdminTableRecords: deleteAdminTableRecords,
    insertAdminTableRecords: insertAdminTableRecords};
