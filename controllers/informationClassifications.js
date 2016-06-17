/**
 * Information Classifications Controller
 */

'use strict';

var settings = require('../config/env/default');
var db = require('../config/database');
var _ = require('lodash');

var admInformationClassifications = db.admInformationClassifications;

var informationClassifications = function (req, res, next) {

    admInformationClassifications.findAll().then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n) {
            wrapper.data.push(n);
        });
        //console.log("informationClassifications wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            results: wrapper
        })
    }).error(function (err) {
        if (err)
            return next(err);
    });
}

module.exports = {
    informationClassifications: informationClassifications
};
