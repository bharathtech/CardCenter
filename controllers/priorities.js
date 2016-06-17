/**
 * Priorities Controller
 */

'use strict';

var settings = require('../config/env/default');
var db = require('../config/database');
var _ = require('lodash');

var msgPriorities = db.msgPriorities;

var priorities = function (req, res, next) {

    msgPriorities.findAll().then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n, key) {
            wrapper.data.push(n);
        });
        //console.log("priorities wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            priorities: wrapper
        })
    })
}

module.exports = {
    priorities: priorities
};
