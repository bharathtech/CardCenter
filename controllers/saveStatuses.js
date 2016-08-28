/**
 * Save Statuses Controller
 */

'use strict';

var settings = require('../config/env/default');
var db = require('../config/database');
var _ = require('lodash');

var msgSaveStatuses = db.msgSaveStatuses;

var saveStatuses = function (req, res, next) {

    msgSaveStatuses.findAll().then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n, key) {
            wrapper.data.push(n);
        });
        //console.log("saveStatuses wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            saveStatuses: wrapper
        })
    })
}

module.exports = {
    saveStatuses: saveStatuses
};
