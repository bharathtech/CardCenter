/**
 * Position Controller
 */

'use strict';

var settings = require('../config/env/default');
var db = require('../config/database');
var _ = require('lodash');

var admPositions = db.admPositions;

var positionsByExclusion = function (req, res, next) {
    var excludedPositions = req.params.excludedPositions.split(",");
    console.log("excludedPositions: " + excludedPositions);
    var positionSQLOptions = {};
    positionSQLOptions["attributes"] = [["ID", "ID"], "positionTitle", "positionName","hrPositionName"];
    positionSQLOptions["where"] = {ID: {$notIn: excludedPositions}};
    positionSQLOptions["order"] = ["positionTitle"];
    admPositions.findAll(positionSQLOptions).then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n) {
            wrapper.data.push(n);
        });
        //console.log("positions wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            results: wrapper
        })
    }).error(function (err) {
        if (err)
            return next(err);
    });
}

module.exports = {
    positionsByExclusion: positionsByExclusion
};
