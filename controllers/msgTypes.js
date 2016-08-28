/**
 * Message Types Controller
 */

'use strict';

var settings = require('../config/env/default');
var db = require('../config/database');
var _ = require('lodash');

var messageTypes = db.msgTypes;

var msgTypes = function (req, res, next) {

    messageTypes.findAll().then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n) {
            wrapper.data.push(n);
        });
        //console.log("msgTypes wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            msgTypes: wrapper
        })
    }).error(function (err) {
        if (err)
            return next(err);
    });
}

module.exports = {
    msgTypes: msgTypes
};
