/**
 * Document View Controller
 */

'use strict';

var consoleLog = true;

var db = require('../config/database');
var _ = require('lodash');

var documents = db.documents;
var documentViews = db.documentViews;
var admPositions = db.admPositions;

/**
 *
 * READ My Previously Viewed data for documents
 */
var definedMyViews = function (req,res,next) {
    var userEmail = req.params.userEmail;
    // -- Build list of message properties from core MSGS table
    var options = {};

    options["attributes"] = [["count([documentViews].dateViewed)","MyViews"],["documentID","ID"],["max([documents].documentName)","Title"],["max([documents].documentTags)","Tags"],["max([documents].documentFormat)","Format"]];
    //options["attributes"] = [["count([documentViews].dateViewed)","MyViews"],["max([documents].documentName)","Title"],["max([documents].documentTags)","Tags"],["max([documents].documentFormat)","Format"]];
    options["include"] = [{ model: documentViews, where: {userID: userEmail}, attributes: []}];
    //options["include"] = [{ model: documentViews, attributes: [], where: {userID: userEmail}, order: {MyViews: "DESC"}}];
    options["where"] = {};
    options["group"] = ["documents.documentID"];
    options["order"] = [db.sequelize.literal("MyViews DESC")];
    documents.hasMany(documentViews, {foreignKey: 'documentID'});
    documentViews.belongsTo(documents, {foreignKey: 'documentID'});
    documents.findAll(options).then(function (data) {
        if (data) {
            if (consoleLog) {
                console.log(JSON.stringify(data));
            }
            res.json(data);
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });

};

/**
 *
 * READ All Previously Viewed data by Role for documents
 */
var roleMyRoleViews = function (req,res,next) {
    var positionName = req.params.positionName;
    // -- Build list of message properties from core MSGS table
    var positionOptions = {};
    var whereList = {};
    whereList["positionName"] = positionName;
    positionOptions["where"] = whereList;
    admPositions.findAll(positionOptions).then(function (data) {
        if (data) {
            var options = {};
            options["attributes"] = [["count([documentViews].dateViewed)", "Views"], ["documentID", "ID"], ["max([documents].documentName)", "Title"], ["max([documents].documentTags)", "Tags"], ["max([documents].documentFormat)", "Format"]];
            options["include"] = [{model: documentViews, attributes: [], where: {positionID: data[0].ID}}];
            options["where"] = {};
            options["group"] = ["documents.documentID"];
            options["order"] = [db.sequelize.literal("Views DESC")];
            documents.hasMany(documentViews, {foreignKey: 'documentID'});
            documentViews.belongsTo(documents, {foreignKey: 'documentID'});
            documents.findAll(options).then(function (data) {
                if (data) {
                    res.json(data);
                }
            }).error(function (err) {
                if (err)
                    return next(err);
            });
        }
    }).error(function (err) {
    if (err)
        return next(err);
});
};

/*****  Open Search for documents given a search term and a search by value *****/
    /*
var openSearch = function(req,res,next){

    var searchBy = req.params.searchBy;
    var searchTerm = req.params.searchTerm;

    // -- Build list of documents matching the search criteria
    var options = {};
    var whereList = {};
    if(searchBy == "allFields"){
        whereList = {$or: [
            {'documentID': {$like: '%' + searchTerm + '%'}},
            {'documentName': {$like: '%' + searchTerm + '%'}},
            {'documentTags': {$like: '%' + searchTerm + '%'}},
            {'documentFormat': {$like: '%' + searchTerm + '%'}}
        ]};
    }
    else{
        whereList[searchBy] = {$like: '%' + searchTerm + '%'};
    }

    options["attributes"] = [["count([documentViews].dateViewed)","MyViews"],["max([documents].documentName)","Title"],["max([documents].documentTags)","Tags"],["max([documents].documentFormat)","Format"]];
    options["include"] = [{ model: documentViews, attributes: [], order: {MyViews: "DESC"}}];
    options["where"] = whereList;
    options["group"] = ["documents.documentID"];
    //options["order"] = [["count(documentViews.dateViewed)","DESC"]];
    documents.hasMany(documentViews, {foreignKey: 'documentID'});
    documentViews.belongsTo(documents, {foreignKey: 'documentID'});
    documents.findAll(options).then(function (data) {
        if (data) {
            if (consoleLog) {
                console.log(JSON.stringify(data));
            }
            res.json(data);
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};
*/

/*****  Open Search for documents given a search term and a search by value *****/
    /*
var filteredSearch = function(req,res,next){

    //tagCategory:  find all docs whose tagCategories of the document tags is the selected tagCategory
    //join document table to tag table where tags in documentTags list then join to the tagCategory table on first join equals tagCategory

    var searchBy = req.params.searchBy;
    var searchTerm = req.params.searchTerm;

    // -- Build list of documents matching the search criteria
    var options = {};
    var whereList = {};
    if(searchBy == "allFields"){
        whereList = {$or: [
            {'documentID': {$like: '%' + searchTerm + '%'}},
            {'documentName': {$like: '%' + searchTerm + '%'}},
            {'documentTags': {$like: '%' + searchTerm + '%'}},
            {'documentFormat': {$like: '%' + searchTerm + '%'}}
        ]};
    }
    else{
        whereList[searchBy] = {$like: '%' + searchTerm + '%'};
    }

    options["attributes"] = [["count([documentViews].dateViewed)","MyViews"],["max([documents].documentName)","Title"],["max([documents].documentTags)","Tags"],["max([documents].documentFormat)","Format"]];
    options["include"] = [{ model: documentViews, attributes: [], order: {MyViews: "DESC"}}];
    options["where"] = whereList;
    options["group"] = ["documents.documentID"];
    //options["order"] = [["count(documentViews.dateViewed)","DESC"]];
    documents.hasMany(documentViews, {foreignKey: 'documentID'});
    documentViews.belongsTo(documents, {foreignKey: 'documentID'});
    documents.findAll(options).then(function (data) {
        if (data) {
            if (consoleLog) {
                console.log(JSON.stringify(data));
            }
            res.json(data);
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};
*/

var filterModel = function(req,res,next){
    var userEmail = req.params.userEmail;
    var filterModel = JSON.parse(req.params.filterModel);
    var filterTags = filterModel["tags"].toString().split(",");
    var filterTitles = filterModel["titles"].toString().split(",");
    var filterFormats = filterModel["formats"].toString().split(",");
    var filterAll = filterModel["all"];
    var joinType = false; // used to set the join type of the sequelize documents/documentViews association to LEFT OUTER JOIN
    if(filterTags.toString() == "" && filterTitles.toString() == "" && filterFormats.toString() == "" && filterAll.toString() == ""){
        joinType = true; // INNER JOIN
    }

    //console.log("tags: " + filterTags.length + "--" + filterTags.toString());
    //console.log("titles: " + filterTitles.length + "--" + filterTitles.toString());
    //console.log("format: " + filterFormats.length + "--" + filterFormats.toString());
    //console.log("all: " +  filterAll.toString());
    //console.log("joinType: " + joinType);

    // -- Build list of documents matching the search criteria
    var options = {};
    var list = [];
    var titlesElement = {},tagsElement = {},formatsElement = {};
    var titlesLike = {},tagsLike = {},formatsLike = {};
    var a = 0,b = 0,c = 0, d = 0;

    if(filterTitles[0] == ""){
        a = 1;
    }
    if(filterTags[0] == ""){
        b = 1;
    }
    if(filterFormats[0] == ""){
        c = 1;
    }
    if(filterAll[0] == ""){
        d = 1;
    }
    for(var i = 0, l = filterTitles.length-a; i < l; i++) {
        titlesLike.$like = '%' + filterTitles[i] + '%';
        titlesElement.documentName = titlesLike;
        list.push(JSON.parse(JSON.stringify(titlesElement)));
    }
    for(var i = 0, l = i + filterTags.length-b; i < l; i++) {
        tagsLike.$like = '%' + filterTags[i] + '%';
        tagsElement.documentTags = tagsLike;
        list.push(JSON.parse(JSON.stringify(tagsElement)));
    }
    for(var i = 0, l = i + filterFormats.length-c; i < l; i++) {
        formatsLike.$like = '%' + filterFormats[i] + '%';
        formatsElement.documentFormat = formatsLike;
        list.push(JSON.parse(JSON.stringify(formatsElement)));
    }
    for(var i = 0, l = i + filterAll.length-d; i < l; i++) {
        titlesLike.$like = '%' + filterAll[i] + '%';
        titlesElement.documentName = titlesLike;
        list.push(JSON.parse(JSON.stringify(titlesElement)));
        tagsLike.$like = '%' + filterAll[i] + '%';
        tagsElement.documentTags = tagsLike;
        list.push(JSON.parse(JSON.stringify(tagsElement)));
        formatsLike.$like = '%' + filterAll[i] + '%';
        formatsElement.documentFormat = formatsLike;
        list.push(JSON.parse(JSON.stringify(formatsElement)));
    }
    documents.hasMany(documentViews, {foreignKey: 'documentID'});
    documentViews.belongsTo(documents, {foreignKey: 'documentID'});
    var whereList = {$or:list};

    options["attributes"] = [["count([documentViews].dateViewed)","MyViews"],["documentID","ID"],["max([documents].documentName)","Title"],["max([documents].documentTags)","Tags"],["max([documents].documentFormat)","Format"]];
    options["include"] = [{ model: documentViews, where: {userID: userEmail}, attributes: [],required: joinType}];
    options["where"] = whereList;
    options["group"] = ["documents.documentID"];
    options["order"] = [db.sequelize.literal("MyViews DESC")];

    documents.findAll(options).then(function (data) {
        if (data) {
            if (consoleLog) {
                console.log(JSON.stringify(data));
            }
            res.json(data);
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

var insertDocumentView = function(req,res,next){
    var newDocumentView = req.body.data;
    var wrapper = {
        "response": [],
        "errors": []
    };
    //console.log("newDocumentView: " + JSON.stringify(newDocumentView));

    var options = {};
    var whereList = {};
    whereList["positionName"] = newDocumentView[0].positionName;
    options["where"] = whereList;
    admPositions.findAll(options).then(function (data) {
        if (data) {
            //console.log("data: " + JSON.stringify(data));
            documentViews.build(
                {
                    "documentID": newDocumentView[0].documentID,
                    "userID": newDocumentView[0].userID,
                    "positionID": data[0].ID,
                    "dateViewed": newDocumentView[0].dateViewed
                }).save().then(function (data) {
                    if (data) {
                        wrapper.response.push(data);
                        return res.status(200).json({
                            results: wrapper
                        });
                    }
                }).error(function (err) {
                    if (err) {
                        wrapper.errors.push(next(err));
                        return res.status(500).json({
                            results: wrapper
                        });
                    }
                });

        } else {
            wrapper.response.push(data);
            return res.status(200).json({
                results: wrapper
            });
        }
    }).error(function (err) {
        if (err)
            wrapper.errors.push(next(err));
        return res.status(500).json({
            results: wrapper
        });
    });
};

var resetAView = function(req,res,next){
    var resetData = req.body.data;
    var wrapper = {
        "response": [],
        "errors": []
    };
    //console.log("newDocumentView: " + JSON.stringify(newDocumentView));

    var options = {};
    var whereList = {};
    whereList["userID"] = resetData[0].userID;
    whereList["documentID"] = resetData[0].documentID;
    options["where"] = whereList;
    documentViews.destroy(options).then(function (deleteData) {
        return res.status(200).json(
            deleteData
        )
    }).error(function (err) {
        if (err)
            wrapper.errors.push(next(err));
        return res.status(500).json({
            results: wrapper
        });
    });
};

var resetAllMyViews = function(req,res,next){
    var userEmail = req.params.userEmail;
    var wrapper = {
        "response": [],
        "errors": []
    };
    //console.log("newDocumentView: " + JSON.stringify(newDocumentView));

    var options = {};
    var whereList = {};
    whereList["userID"] = userEmail;
    options["where"] = whereList;
    documentViews.destroy(options).then(function (deleteData) {
        return res.status(200).json(
            deleteData
        )
    }).error(function (err) {
        if (err)
            wrapper.errors.push(next(err));
        return res.status(500).json({
            results: wrapper
        });
    });
};

module.exports = {
    definedMyViews: definedMyViews,
    roleMyRoleViews: roleMyRoleViews,
    filterModel: filterModel,
    insertDocumentView: insertDocumentView,
    resetAView: resetAView,
    resetAllMyViews: resetAllMyViews
};
