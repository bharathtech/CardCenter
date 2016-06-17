/**
 * Accounts Controller
 */

'use strict';

var db = require('../config/database');
var accountInfo = db.accountInfo
var accountResp = db.accountResp;

/**
 * Account Operations
 *
 */

// -- Read all the data from the accountInfo table
var readAccountList = function (req, res, next) {

    var filterJson = req.params.filterJson;
    console.log("filterJson: " + JSON.stringify(filterJson));
    var modelAccountList = db["accountInfo"];

    //var whereField = 'FIRST_NAME'; //req.params.whereField;
    //var whereValue = 'Maria'; //req.params.whereValue;
    //console.log("tableName: " + tableName);

    // -- Build the Options object
    var options = {};
    //var whereList = {};
    //whereList[whereField] = whereValue;
    //options["attributes"] = ['LAST_NAME','FIRST_NAME','EMAIL'];
    //options["where"] = whereList;

    modelAccountList
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

// -- Read all the chain data from the accountResp table
var readChainList = function (req, res, next) {

    var chainList = db["accountResp"];

    // -- Build the Options object
    var chainOptions = {};
    chainOptions["attributes"] = ['chainNum','chainName'];
    chainOptions["where"] ={chainName: {$not: null}};
    chainOptions["order"] = ['chainName'];
    chainList
        .findAll(chainOptions)
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

// -- Read data for Account Filters given the Chain
var getDISTRICT_TM_TSFilters = function (req, res, next) {

    var updatedAccountFilter = {
        "filterData": [
            {
                "districts": [
                    {"districtNum": 1023, "rmmName": "CLEON BRAUN"},
                    {"districtNum": 1024, "rmmName": "ART SCHROM"}
                ],
                "tmTerritories": [
                    {"tmTerritoryNum": 10133, "tmName": "DEANNE MITCHELL"},
                    {"tmTerritoryNum": 10134, "tmName": "PATRICIA ROBERTS"}
                ],
                "tsTerritories": [
                    {"tsTerritoryNum": 102326, "tsTerritoryName": "L6 TERRITORY R213 03"},
                    {"tsTerritoryNum": 102329, "tsTerritoryName": "L6 TERRITORY R213 06"}
                ]//,
                //"accountList": [
                //    {"accountNum": 138519,"storeName":"TURKEY HILL 717-717"},
                //    {"accountNum": 105267,"storeName":"FRY'S FOOD 109-109"}
                //]
            }
        ]
    };

    var chainNum = req.params.chainNum;

    // -- Build the District object
    var districtOptions = {};
    districtOptions["attributes"] = ["districtNum", ["max(rmmName)","rmmName"]];
    districtOptions["group"] = ["districtNum"];
    districtOptions["where"] ={chainNum: chainNum, rmmName: {$not: null}};
    districtOptions["order"] = ['rmmName'];
    accountResp.findAll(districtOptions)
        .then(function (districtData) {
            if (districtData) {
                updatedAccountFilter["filterData"][0]["districts"] = districtData;

                // -- Build the TM Territory object
                var tmTerritoryOptions = {};
                tmTerritoryOptions["attributes"] = ["tmTerritoryNum", ["max(tmName)","tmName"]];
                tmTerritoryOptions["group"] = ["tmTerritoryNum"];
                tmTerritoryOptions["where"] ={chainNum: chainNum, tmName: {$not: null}};
                tmTerritoryOptions["order"] = ['tmName'];
                accountResp.findAll(tmTerritoryOptions)
                    .then(function (tmTerritoryData) {
                        if (tmTerritoryData) {
                            updatedAccountFilter["filterData"][0]["tmTerritories"] = tmTerritoryData;

                            // -- Build the TS Territory object
                            var tsTerritoryOptions = {};
                            tsTerritoryOptions["attributes"] = ["tsTerritoryNum", ["max(tsName)","tsName"]];
                            tsTerritoryOptions["group"] = ["tsTerritoryNum"];
                            tsTerritoryOptions["where"] ={chainNum: chainNum, tsName: {$not: null}};
                            tsTerritoryOptions["order"] = ['tsName'];
                            accountResp.findAll(tsTerritoryOptions)
                                .then(function (tsTerritoryData) {
                                    if (tsTerritoryData) {
                                        updatedAccountFilter["filterData"][0]["tsTerritories"] = tsTerritoryData;
                                        res.json(updatedAccountFilter);
                                    }
                                });
                        }
                    });
            }
        }).error(function (err) {
            if (err)
                return next(err);
        });
};

// -- Read data for Account Filters given Chain and District
var getTM_TSFilters = function (req, res, next) {

    var updatedAccountFilter = {
        "filterData": [
            {
                "tmTerritories": [
                    {"tmTerritoryNum": 10133, "tmName": "DEANNE MITCHELL"},
                    {"tmTerritoryNum": 10134, "tmName": "PATRICIA ROBERTS"}
                ],
                "tsTerritories": [
                    {"tsTerritoryNum": 102326, "tsName": "L6 TERRITORY R213 03"},
                    {"tsTerritoryNum": 102329, "tsName": "L6 TERRITORY R213 06"}
                ]
            }
        ]
    };

    var districtNum = req.params.districtNum;

    // -- Build the TM Territory object
    var tmTerritoryOptions = {};
    tmTerritoryOptions["attributes"] = ["tmTerritoryNum", ["max(tmName)","tmName"]];
    tmTerritoryOptions["group"] = ["tmTerritoryNum"];
    tmTerritoryOptions["where"] ={districtNum: districtNum, tmName: {$not: null}};
    tmTerritoryOptions["order"] = ['tmName'];
    accountResp.findAll(tmTerritoryOptions)
        .then(function (tmTerritoryData) {
            if (tmTerritoryData) {
                updatedAccountFilter["filterData"][0]["tmTerritories"] = tmTerritoryData;

                // -- Build the TS Territory object
                var tsTerritoryOptions = {};
                tsTerritoryOptions["attributes"] = ["tsTerritoryNum", ["max(tsName)","tsName"]];
                tsTerritoryOptions["group"] = ["tsTerritoryNum"];
                tsTerritoryOptions["where"] ={districtNum: districtNum, tsName: {$not: null}};
                tsTerritoryOptions["order"] = ['tsName'];
                accountResp.findAll(tsTerritoryOptions)
                    .then(function (tsTerritoryData) {
                        if (tsTerritoryData) {
                            updatedAccountFilter["filterData"][0]["tsTerritories"] = tsTerritoryData;
                            res.json(updatedAccountFilter);
                        }
                    });
            }
        }).error(function (err) {
            if (err)
                return next(err);
        });
};

// -- Read data for Account Filters given Chain and District and TM Territory
var getTSFilters = function (req, res, next) {

    var updatedAccountFilter = {
        "filterData": [
            {
                "tsTerritories": [
                    {"tsTerritoryNum": 102326, "tsTerritoryName": "L6 TERRITORY R213 03"},
                    {"tsTerritoryNum": 102329, "tsTerritoryName": "L6 TERRITORY R213 06"}
                ]
            }
        ]
    };

    var tmTerritoryNum = req.params.tmTerritoryNum;

    // -- Build the TS Territory object
    var tsTerritoryOptions = {};
    tsTerritoryOptions["attributes"] = ["tsTerritoryNum", ["max(tsName)","tsName"]];
    tsTerritoryOptions["group"] = ["tsTerritoryNum"];
    tsTerritoryOptions["where"] ={tmTerritoryNum: tmTerritoryNum, tsName: {$not: null}};
    tsTerritoryOptions["order"] = ['tsName'];
    accountResp.findAll(tsTerritoryOptions)
        .then(function (tsTerritoryData) {
            if (tsTerritoryData) {
                updatedAccountFilter["filterData"][0]["tsTerritories"] = tsTerritoryData;
                res.json(updatedAccountFilter);
/*
                // -- Build the Account List object
                // --  Find accounts in accountResp by selected Chain
                var accountIn = [];
                var accountInOptions = {};
                accountInOptions["where"] = whereList;
                accountInOptions["attributes"] = ["accountNum"];
                accountInOptions["group"] = ["accountNum"];
                accountResp.findAll(accountInOptions)
                    .then(function (accountInData) {
                        if (accountInData) {
                            for (var x = 0; x < accountInData.length;x++){
                                accountIn.push(accountInData[x]["accountNum"]);
                            }
                            // -- Find accounts in accountInfo that match accounts in the selected Chain, District, and TM Territory
                            var accountListOptions = {};
                            accountListOptions["where"] = {"accountNum": {$in: [accountIn]}};
                            accountListOptions["attributes"] = ["accountNum", "storeName"];
                            accountInfo.findAll(accountListOptions)
                                .then(function (accountListData) {
                                    if (accountListData) {
                                        updatedAccountFilter["filterData"][0]["accountList"] = accountListData;
                                        res.json(updatedAccountFilter);
                                    }
                                });
                        }
                    });
*/
            }
        }).error(function (err) {
            if (err)
                return next(err);
        });
};

// -- Read data for Account Filters given Chain and District and TM Territory
var readAccountResponsibilityRecipients = function (req, res, next) {

    var recipientListData = {
        "filterData": [
            {
                "recipientList": [
                    {"EMAIL": "LPAVOL1", "FULLNAME": "Pavola Linda"},
                    {"EMAIL": "KWEINE2", "FULLNAME": "Weiner Kim"}
                ]
            }
        ]
    };

    //positionID's need to match positionId from accountResp
    /*
    var chainNum = req.params.chainNum;
    var districtNum = req.params.districtNum;
    var tmTerritoryNum = req.params.tmTerritoryNum;
    var tsTerritoryNum = req.params.tsTerritoryNum;
    */
    var distributeByField = req.params.distributeByField;
    var filterID = req.params.distributeByCategoryID;
    var positionList = req.params.positionList;

    // -- Build the Recipient List object
    var accountResponsibilityOptions = {};
    var whereList = {};

    whereList[distributeByField] = filterID;
/*
    if (chainNum != " "){
        whereList["chainNum"] = chainNum;
    }
    if (districtNum != " "){
        whereList["districtNum"] = districtNum;
    }
    if (tmTerritoryNum != " "){
        whereList["tmTerritoryNum"] = tmTerritoryNum;
    }
    if (tsTerritoryNum != " "){
        whereList["tsTerritoryNum"] = tsTerritoryNum;
    }
    */
    //  -- there needs to be some sort of look up between id in positionID the the column name to be searched in accountResp
    if (positionList.length > 0){
        //whereList["positionId"] = {$in: [positionList]};
    }
    whereList["tmEmployeeNum"] = {$not: null};
    accountResponsibilityOptions["where"] = whereList;
    accountResponsibilityOptions["attributes"] = [["tmEmployeeNum","EMAIL"],["max(tmName)","FULLNAME"]];
    accountResponsibilityOptions["group"] = ["tmEmployeeNum"];
    accountResp.findAll(accountResponsibilityOptions)
        .then(function (recipientList) {
            if (recipientList) {
                recipientListData["filterData"][0]["recipientList"] = recipientList;
                res.json(recipientListData);
            }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

module.exports = {
    readAccountList: readAccountList,
    readChainList: readChainList,
    getDISTRICT_TM_TSFilters: getDISTRICT_TM_TSFilters,
    getTM_TSFilters: getTM_TSFilters,
    getTSFilters: getTSFilters,
    readAccountResponsibilityRecipients: readAccountResponsibilityRecipients
    //readAdminTablesWithParam: readAdminTablesWithParam
};
