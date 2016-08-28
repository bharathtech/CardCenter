/**
 * MSO Field Hierarchy Controller
 */

'use strict';

var settings = require('../config/env/default');
var db = require('../config/database');
var _ = require('lodash');

var msoFieldHierarchy = db.msoFieldHierarchy;

var getMsoLevel1s = function (req, res, next) {
    var level1SQLOptions = {};
    level1SQLOptions["attributes"] = ["emailL1", ["max(employeeNameL1)", "employeeNameL1"]];
    level1SQLOptions["group"] = ["emailL1"];
    level1SQLOptions["where"] = {emailL1: {$not: null}};
    level1SQLOptions["order"] = ['employeeNameL1'];
    msoFieldHierarchy.findAll(level1SQLOptions).then(function (myData) {
        if (myData) {
            var wrapper = {"data": []};
            _.forEach(myData, function (n) {
                wrapper.data.push(n);
            });
            //console.log("msoLevel1 wrapper: " + JSON.stringify(wrapper));
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

var getMsoLevel2s = function (req, res, next) {
    var level2SQLOptions = {};
    level2SQLOptions["attributes"] = ["emailL2", ["max(employeeNameL2)", "employeeNameL2"]];
    level2SQLOptions["group"] = ["emailL2"];
    level2SQLOptions["where"] = {emailL2: {$not: null}};
    level2SQLOptions["order"] = ['employeeNameL2'];
    msoFieldHierarchy.findAll(level2SQLOptions).then(function (myData) {
        if (myData) {
            var wrapper = {"data": []};
            _.forEach(myData, function (n) {
                wrapper.data.push(n);
            });
            //console.log("msoLevel2 wrapper: " + JSON.stringify(wrapper));
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

var getMsoLevel2sByLevel1 = function (req, res, next) {
    var level2SQLOptions = {};
    var emailL1 = req.params.level1Email;
    level2SQLOptions["attributes"] = ["emailL2", ["max(employeeNameL2)", "employeeNameL2"],["max(emailL1)","emailL1"]];
    level2SQLOptions["group"] = ["emailL2"];
    level2SQLOptions["where"] = {emailL1: emailL1, emailL2: {$not: null}};
    level2SQLOptions["order"] = ['employeeNameL2'];
    msoFieldHierarchy.findAll(level2SQLOptions).then(function (myData) {
        if (myData) {
            var wrapper = {"data": []};
            _.forEach(myData, function (n) {
                wrapper.data.push(n);
            });
            //console.log("msoLevel2 wrapper: " + JSON.stringify(wrapper));
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

module.exports = {
    getMsoLevel1s: getMsoLevel1s,
    getMsoLevel2s: getMsoLevel2s,
    getMsoLevel2sByLevel1: getMsoLevel2sByLevel1
};
