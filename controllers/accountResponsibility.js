/**
 * Account Responsibility Controller
 */

'use strict';

var settings = require('../config/env/default');
var db = require('../config/database');
var _ = require('lodash');

var accountResp = db.accountResp;


/**
 * /chains
 * Read chain data.
 */
var getChains = function (req, res, next) {
    var chainSQLOptions = {};
    chainSQLOptions["attributes"] = ['chainNum','chainName'];
    chainSQLOptions["group"] = ['chainNum','chainName'];
    chainSQLOptions["where"] = {chainName: {$not: null}};
    chainSQLOptions["order"] = ['chainName'];
    accountResp.findAll(chainSQLOptions).then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n) {
            wrapper.data.push(n);
        });
        //console.log("chains wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            results: wrapper
        })
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

/**
 * /districts
 * Read district data.
 */
var getDistricts = function (req, res, next) {
    var districtSQLOptions = {};
    districtSQLOptions["attributes"] =['districtNum',[db.Sequelize.literal("CASE when max(rmmName) IS NULL then 'VACANCY - ' + max(districtName) else max(rmmName) end "),'rmmName']];
    districtSQLOptions["group"] = ['districtNum'];
    districtSQLOptions["order"] = ['rmmName'];
    accountResp.findAll(districtSQLOptions).then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n) {
            wrapper.data.push(n);
        });
        //console.log("districts wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            results: wrapper
        })
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

/**
 * /tmTerritories
 * Read TM Territory data.
 */
var getTmTerritories = function (req, res, next) {
    var tmTerritorySQLOptions = {};
    tmTerritorySQLOptions["attributes"] =['tmTerritoryNum',[db.Sequelize.literal("CASE when max(tmName) IS NULL then 'VACANCY - ' + max(tmTerritoryName) else max(tmName) end "),'tmName']];
    tmTerritorySQLOptions["group"] = ['tmTerritoryNum'];
    tmTerritorySQLOptions["order"] = ['tmName'];
    accountResp.findAll(tmTerritorySQLOptions).then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n) {
            wrapper.data.push(n);
        });
        //console.log("tmTerritories wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            results: wrapper
        })
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

/**
 * /tsTerritories
 * Read TS Territory data.
 */
var getTsTerritories = function (req, res) {
    var tsTerritorySQLOptions = {};
    tsTerritorySQLOptions["attributes"] = ['tsTerritoryNum',[db.Sequelize.literal("CASE when max(tsName) IS NULL then 'VACANCY - ' + max(tsTerritoryName) else max(tsName) end "), 'tsName']];
    tsTerritorySQLOptions["group"] = ['tsTerritoryNum'];
    tsTerritorySQLOptions["order"] = ['tsName'];
    accountResp.findAll(tsTerritorySQLOptions).then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n) {
            wrapper.data.push(n);
        });
        //console.log("tsTerritories wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            results: wrapper
        })
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

// -- Read data for Account Filters given the Chain

// -- Build the District object filtered by Chain
var getDistrictsByChain = function (req, res, next) {
    var chainNum = req.params.chainNum;
    var districtSQLOptions = {};
    districtSQLOptions["attributes"] =['districtNum',[db.Sequelize.literal("CASE when max(rmmName) IS NULL then 'VACANCY - ' + max(districtName) else max(rmmName) end "),'rmmName'],[db.Sequelize.literal("max(chainNum)"),'chainNum']];
    districtSQLOptions["where"] = {chainNum: chainNum};
    districtSQLOptions["group"] = ['districtNum'];
    districtSQLOptions["order"] = ['rmmName'];
    accountResp.findAll(districtSQLOptions).then(function (myData) {
        var wrapper = { "data": [] };
        _.forEach(myData, function(n) {
            wrapper.data.push(n);
        });
        //console.log("districts filtered by chain  wrapper: " + JSON.stringify(wrapper));
        return res.status(200).json({
            results: wrapper
        })
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

// -- Build the TmTerritories object filtered by Chain
var getTmTerritoriesByChain = function (req, res, next) {
    var chainNum = req.params.chainNum;
    var tmTerritoryOptions = {};
    tmTerritoryOptions["attributes"] =['tmTerritoryNum',[db.Sequelize.literal("CASE when max(tmName) IS NULL then 'VACANCY - ' + max(tmTerritoryName) else max(tmName) end "),'tmName'],[db.Sequelize.literal("max(chainNum)"),'chainNum']];
    tmTerritoryOptions["group"] = ["tmTerritoryNum"];
    tmTerritoryOptions["where"] ={chainNum: chainNum, tmName: {$not: null}};
    tmTerritoryOptions["order"] = ['tmName'];
    accountResp.findAll(tmTerritoryOptions).then(function (myData) {
        if (myData) {
            var wrapper = { "data": []};
            _.forEach(myData, function (n) {
                wrapper.data.push(n);
            });
            //console.log("tmTerritories filtered by chain wrapper: " + JSON.stringify(wrapper));
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

// -- Build the TsTerritories object filtered by Chain
var getTsTerritoriesByChain = function (req, res, next) {
    var chainNum = req.params.chainNum;
    var tsTerritoryOptions = {};
    tsTerritoryOptions["attributes"] = ["tsTerritoryNum",[db.Sequelize.literal("CASE when max(tsName) IS NULL then 'VACANCY - ' + max(tsTerritoryName) else max(tsName) end "), 'tsName'],[db.Sequelize.literal("max(chainNum)"),'chainNum']];
    tsTerritoryOptions["group"] = ["tsTerritoryNum"];
    tsTerritoryOptions["where"] ={chainNum: chainNum, tsName: {$not: null}};
    tsTerritoryOptions["order"] = ['tsName'];
    accountResp.findAll(tsTerritoryOptions).then(function (myData) {
        if (myData) {
            var wrapper = { "data": []};
            _.forEach(myData, function (n) {
                wrapper.data.push(n);
            });
            //console.log("tsTerritories filtered by chain wrapper: " + JSON.stringify(wrapper));
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

// -- Build the TmTerritories object filtered by District
var getTmTerritoriesByDistrict = function (req, res, next) {
    var districtNum = req.params.districtNum;
    var tmTerritoryOptions = {};
    tmTerritoryOptions["attributes"] = ["tmTerritoryNum",[db.Sequelize.literal("CASE when max(tmName) IS NULL then 'VACANCY - ' + max(tmTerritoryName) else max(tmName) end "),'tmName'],[db.Sequelize.literal("max(districtNum)"),'districtNum']];
    tmTerritoryOptions["group"] = ["tmTerritoryNum"];
    tmTerritoryOptions["where"] ={districtNum: districtNum, tmName: {$not: null}};
    tmTerritoryOptions["order"] = ['tmName'];
    accountResp.findAll(tmTerritoryOptions).then(function (myData) {
        if (myData) {
            var wrapper = { "data": []};
            _.forEach(myData, function (n) {
                wrapper.data.push(n);
            });
            //console.log("tmTerritories filtered by district wrapper: " + JSON.stringify(wrapper));
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

// -- Build the TsTerritories object filtered by District
var getTsTerritoriesByDistrict = function (req, res, next) {
    var districtNum = req.params.districtNum;
    var tsTerritoryOptions = {};
    tsTerritoryOptions["attributes"] = ["tsTerritoryNum",[db.Sequelize.literal("CASE when max(tsName) IS NULL then 'VACANCY - ' + max(tsTerritoryName) else max(tsName) end "),'tsName'],[db.Sequelize.literal("max(districtNum)"),'districtNum']];
    tsTerritoryOptions["group"] = ["tsTerritoryNum"];
    tsTerritoryOptions["where"] ={districtNum: districtNum, tsName: {$not: null}};
    tsTerritoryOptions["order"] = ['tsName'];
    accountResp.findAll(tsTerritoryOptions).then(function (myData) {
        if (myData) {
            var wrapper = { "data": []};
            _.forEach(myData, function (n) {
                wrapper.data.push(n);
            });
            //console.log("tsTerritories filtered by district wrapper: " + JSON.stringify(wrapper));
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

// -- Build the TsTerritories object filtered by TmTerritory
var getTsTerritoriesByTmTerritory = function (req, res, next) {
    var tmTerritoryNum = req.params.tmTerritoryNum;
    var tsTerritoryOptions = {};
    tsTerritoryOptions["attributes"] = ["tsTerritoryNum", [db.Sequelize.literal("CASE when max(tsName) IS NULL then 'VACANCY - ' + max(tsTerritoryName) else max(tsName) end "),'tsName'],[db.Sequelize.literal("max(tmTerritoryNum)"),'tmTerritoryNum']];
    tsTerritoryOptions["group"] = ["tsTerritoryNum"];
    tsTerritoryOptions["where"] ={tmTerritoryNum: tmTerritoryNum, tsName: {$not: null}};
    tsTerritoryOptions["order"] = ['tsName'];
    accountResp.findAll(tsTerritoryOptions).then(function (myData) {
        if (myData) {
            var wrapper = { "data": []};
            _.forEach(myData, function (n) {
                wrapper.data.push(n);
            });
            //console.log("tsTerritories filtered by TmTerritory wrapper: " + JSON.stringify(wrapper));
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
    getChains: getChains,
    getDistricts: getDistricts,
    getTmTerritories: getTmTerritories,
    getTsTerritories: getTsTerritories,
    getDistrictsByChain: getDistrictsByChain,
    getTmTerritoriesByChain: getTmTerritoriesByChain,
    getTsTerritoriesByChain: getTsTerritoriesByChain,
    getTmTerritoriesByDistrict: getTmTerritoriesByDistrict,
    getTsTerritoriesByDistrict: getTsTerritoriesByDistrict,
    getTsTerritoriesByTmTerritory: getTsTerritoriesByTmTerritory
};
