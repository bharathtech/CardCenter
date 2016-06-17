/**
 * Message Controller
 */

'use strict';

var db = require('../config/database');
var _ = require('lodash');
var async = require('async');

var MessageModel = db.MSGS;
var msgTypes = db.msgTypes;
var msgPriorities = db.msgPriorities;
var admTagCategories = db.admTagCategories;
var admPositions = db.admPositions;
var admTags = db.admTags;
var admInformationClassifications = db.admInformationClassifications;
var documents = db.documents;
var msgTags = db.msgTags;
var msgDocuments = db.msgDocuments;
var distributeByCategories = db.msgDistributeByCategories;
var accountInfo = db.accountInfo;
var saveStatuses = db.msgSaveStatuses;
var accountResp = db.accountResp;
var msgDistributedTo = db.msgDistributedTo;
var msgRecipients = db.msgRecipients;
var employeeHierarchy = db.msoFieldHierarchy;

//  Used  "ALL Positions" is selected from any positions dropdowns and to choose the correct field name from accountResp for user email
var allPositionsIDsArray;
var allPositionsNamesArray;
var allPositionsObj;
var positionOptions = {
    attributes: ["ID", "positionTitle", "hrPositionName", "accountRespEmailField"],
    where: {accountRespEmailField: {$ne: null}}
};
var allPositions = admPositions.findAll(positionOptions).then(function (myData) {
    if (myData) {
        return myData;
    }
});
allPositions.then(function(allPositions) {
    allPositionsIDsArray = _.pluck(allPositions,"ID").map(String);
    allPositionsNamesArray = _.pluck(allPositions,"positionTitle").map(String);
    allPositionsObj = allPositions;
});

//  Insert message distribution list into DB
function InsertMsgDistributedTo(msgID, distributeByCategoryID, distributeByCategoryValue, distributeByCategoryValueName, distributionGroup, wrapper ){
    msgDistributedTo.build(
        {
            "msgID": msgID,
            "distributeByCategoryID": distributeByCategoryID,
            "distributeByCategoryValue": distributeByCategoryValue,
            "distributeByCategoryValueName": distributeByCategoryValueName,
            "distributionGroup": distributionGroup
        }
    ).save().error(function (err) {
            if (err) {
                wrapper.insertErrors.push(next(err));
            }
    }).then(function(){
        return wrapper;
    });
}

/**
 *
 * GET messages based on 1 parameter
 */
var readByFieldValue = function(req,res,next){
    var whereField = req.params.whereField;
    var whereValue = req.params.whereValue;
    var whereList = {};
    whereList[whereField] = whereValue;
    var readByFieldValueOptions = {where: whereList};
    MessageModel.findAll(readByFieldValueOptions).then(function (myData) {
        if (myData) {
            var wrapper = { "data": [] };
            _.forEach(myData, function(n) {
                wrapper.data.push(n);
            });
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    })
};

/**
 *
 * GET messages types  getMessagePriorities
 */
var getTypes = function(req,res,next){
    msgTypes.findAll().then(function (myData) {
        if (myData) {
            var wrapper = { "data": [] };
            _.forEach(myData, function(n) {
                wrapper.data.push(n);
            });
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    })
};

/**
 *
 * GET messages to edit
 */
var getMessagesToEdit = function(req,res,next){
    var messageModelOptions = {
        attributes: ["ID","subject"],
        order: "lastModifiedDate DESC"
    };
    MessageModel.findAll(messageModelOptions).then(function (myData) {
        if (myData) {
            var wrapper = { "data": [] };
            _.forEach(myData, function(n) {
                wrapper.data.push(n);
            });
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    })
};

/**
 *
 * GET distributeBy Categories
 */
var distributeByCategory = function(req,res,next){
    distributeByCategories.findAll().then(function (myData) {
        if (myData) {
            return res.status(200).json({
                results: myData
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    })
};

/**
 *
 * GET messages getSaveStatuses
 */
var getSaveStatuses = function(req,res,next){
    saveStatuses.findAll().then(function (myData) {
        if (myData) {
            var wrapper = { "data": [] };
            _.forEach(myData, function(n) {
                wrapper.data.push(n);
            });
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    })
};

/**
 *
 * GET messages priorities
 */
var getPriorities = function(req,res,next){
    msgPriorities.findAll().then(function (myData) {
        if (myData) {
            var wrapper = { "data": [] };
            _.forEach(myData, function(n) {
                wrapper.data.push(n);
            });
            return res.status(200).json({
                results: wrapper
            })
        }
    }).error(function (err) {
        if (err)
            return next(err);
    })
};


/**
 *
 * READ a new message
 */
var readMessageModel = function (req, res, next) {
    var msgID = req.params.msgID;

    MessageModel.hasMany(msgTags,{foreignKey: 'msgID'});
    msgTags.belongsTo(MessageModel,{foreignKey: 'msgID',targetKey: 'ID'});
    msgTags.belongsTo(admTags,{foreignKey: 'tagID'});

    MessageModel.hasMany(msgDocuments,{foreignKey: 'msgID'});
    msgDocuments.belongsTo(MessageModel,{foreignKey: 'msgID',targetKey: 'ID'});
    msgDocuments.belongsTo(documents,{foreignKey: 'documentID'});

    MessageModel.hasMany(msgDistributedTo,{foreignKey: 'msgID'});
    msgDistributedTo.belongsTo(MessageModel,{foreignKey: 'msgID',targetKey: 'ID'});
    msgDistributedTo.belongsTo(distributeByCategories,{foreignKey: 'distributeByCategoryID'});

    var messageModelOptions = {
        include: [
            {
                model: msgTags,
                required: true,
                attributes: ["msgID"],
                include: {
                    model: admTags,
                    attributes: ["ID", "tagName"],
                    required: true}
            },
            {
                model: msgDocuments,
                required: false,
                attributes: ["msgID"],
                include: {
                    model: documents,
                    attributes: ["documentID","documentName"],
                    required: false}
            },
            {
                model: msgDistributedTo,
                required: true,
                attributes: ["distributeByCategoryID","distributeByCategoryValue","distributeByCategoryValueName","distributionGroup"],
                where: {msgID: msgID, distributeByCategoryValueName : {$ne: null}},
                order: "distributionGroup ASC",
                include: {
                    model: distributeByCategories,
                    attributes: ["distributeByCategoryName"],
                    required: true}
            }
        ],
        where: {ID: msgID}
    };
	MessageModel.findAll(messageModelOptions).then(function (readMsgsData) {
        if (readMsgsData) {
            return res.status(200).json(
                readMsgsData
            )
        }
    }).error(function (err) {
        if (err)
            return next(err);
    });
};

// Used for both New Messsages and Updates
var levels = [
    { msoFieldHierarchyField : "emailL1", titleField : "positionNameL1"},
    { msoFieldHierarchyField : "emailL2", titleField : "positionNameL2"},
    { msoFieldHierarchyField : "emailL3", titleField : "positionNameL3"},
    { msoFieldHierarchyField : "emailL4", titleField : "positionNameL4"}
];

function BuildMsgDocumentRecords(messageData, msgID, wrapper){
    //  Loop through each message attachment and save each attachment into the DB
    var docCounter = 0;
    _.each(messageData.messageAttachmentList, function (item) {
        msgDocuments.build({"msgID": msgID, "documentID": item.documentID}).save().error(function (err) {
            if (err) {
                wrapper.insertErrors.push(next(err));
                return wrapper;
            }
        }).then(function(){
            docCounter++;
            if(docCounter == messageData.messageAttachmentList.length) {
                return wrapper;
            }
        });
    });
}

function BuildMsgTagRecords(messageData, msgID, wrapper){
    //  Loop through each message tag and save each tag into the DB
    var tagCounter = 0;
    _.each(messageData.messageTagsList, function (item) {
        msgTags.build({"msgID": msgID, "tagID": item.value}).save().error(function (err) {
            if (err) {
                wrapper.insertErrors.push(next(err));
                return wrapper;
            }
        }).then(function(){
            tagCounter++;
            if(tagCounter == messageData.messageTagsList.length) {
                return wrapper;
            }
        });
    });
}

function MsgRecipientsByAccountResponsibility(allPositionsObj, positionID, distributeByField, filterID, msgID, wrapper, callback){
    var accountRespPosition  = JSON.parse(JSON.stringify(_.find(allPositionsObj,{"ID": parseInt(positionID)})));
    var whereList = {};
    // Custom account filtering is a list of accounts
    if (distributeByField == "accountNum") {
        whereList[distributeByField] = {$in: filterID.split(",")};
    } else {
        whereList[distributeByField] = filterID;
    }
    if(distributeByField != accountRespPosition.accountRespEmailField) {
        whereList[accountRespPosition.accountRespEmailField] = {$not: null}; //so that we don't overwrite the distributeByField whereList value
    }
    var accountResponsibilityOptions = {
        attributes: [[accountRespPosition.accountRespEmailField, "EMAIL"]],
        where: whereList,
        group: accountRespPosition.accountRespEmailField
    };
    accountResp.findAll(accountResponsibilityOptions).then(function (recipientList) {
        if (recipientList.length > 0) {
            for (var y = 0; y < recipientList.length; y++) {
                var recipient = JSON.parse(JSON.stringify(recipientList[y]));
                var recipientData = {
                    "msgID": msgID,
                    "email": recipient["EMAIL"].toString(),
                    "isRead": 0,
                    "isArchived": false,
                    "isFlagged": false

                };
                wrapper.recipientData.push(recipientData);
            }
        }
        callback(null, wrapper);
    }).error(function(err){
        if (err) {
            wrapper.insertErrors.push(next(err));
            callback(null, wrapper);
        }
    });
}

function MsgRecipientsByEmployeeResponsibility(allPositionsObj, positionID, distributeByField, filterID, msgID, wrapper,callback){
    _.each(levels, function(level,levelIndex){
        var whereList = {};
        whereList[distributeByField] = filterID;
        if(distributeByField != level.msoFieldHierarchyField) {
            whereList[level.msoFieldHierarchyField] = {$not: null}; //so that we don't overwrite the distributeByField whereList value
        }
        var filteredLevelTitle = _.where(allPositionsObj, {ID: parseInt(positionID)});
        whereList[level.titleField] = [filteredLevelTitle[0].hrPositionName];
        var employeeResponsibilityOptions = {
            attributes: [[level.msoFieldHierarchyField, "EMAIL"]],
            where: whereList,
            group: [level.msoFieldHierarchyField]
        };
        employeeHierarchy.findAll(employeeResponsibilityOptions).then(function (recipientList) {
            if (recipientList.length > 0) {
                for (var y = 0; y < recipientList.length; y++) {
                    var recipient = JSON.parse(JSON.stringify(recipientList[y]));
                    var recipientData = {
                        "msgID": msgID,
                        "email": recipient["EMAIL"].toString(),
                        "isRead": 0,
                        "isArchived": false,
                        "isFlagged": false
                    };
                    wrapper.recipientData.push(recipientData);
                }
            }
            if(levels.length == levelIndex + 1) {
                callback(null, wrapper);
            }
        }).error(function (err) {
            if (err) {
                wrapper.insertErrors.push(next(err));
                if(levels.length == levelIndex + 1) {
                    callback(null, wrapper);
                }
            }
        });
    });
}


/**
 *
 * INSERT a new message
 */
var insertNewMessage = function(req, res, next) {
    var newMessage = req.body.data;
    newMessage = newMessage[0];
    newMessage.hasAttachment = 0;
    if (typeof newMessage.messageAttachmentList !== "undefined"){
        if(newMessage.messageAttachmentList.length>0) {
            newMessage.hasAttachment = 1;
        }
    }
    if (newMessage.actionDate == ""){
        newMessage.actionDate = null;
    }
    var wrapper = {
        "recipientData": [],
        "insertErrors": []
    };

    var numberOfInserts = 1; //  Start at 1 for the insert of the message content
    numberOfInserts++; //  Add another for tags insert because tags are required
    numberOfInserts++; //  Add another for distribution insert because a distribution group is required
    if(newMessage.hasAttachment > 0){
        numberOfInserts++;
    }

    //  Will execute after numberOfUpdates (all updates) are complete
    var afterAllInserts = _.after(numberOfInserts, function (results) {
        return res.status(200).json({
            results: results
        });
    });

    var msgID = "";
    //  Save the base NewMessage data into the DB
    MessageModel.build(newMessage).save().then(function (msgsData) {
        msgID = msgsData.ID;  //  Grab the newly created msgID to be used in the msgXXX tables

        if(newMessage.hasAttachment > 0) {
            afterAllInserts(BuildMsgDocumentRecords(newMessage, msgID, wrapper));
        }
        afterAllInserts(BuildMsgTagRecords(newMessage, msgID, wrapper));
        //  Prepare to insert message distribution and recipient lists
        //  Executes after the _.each distributeToData loop is finished
        var afterAllDistributionGroups = _.after(newMessage.distributeToData.length,function(results){
            var i, j,k=0,temparray,chunk = 1000; //  Sequelize bulkCreate is limited to 1000 records at a time
            var uniqueRecipients = _.uniq(results.recipientData, "email");
            if(uniqueRecipients.length == 0){
                afterAllInserts(wrapper);
            }
            for (i = 0, j = uniqueRecipients.length; i < j; i += chunk) {
                temparray = uniqueRecipients.slice(i, i + chunk);
                msgRecipients.bulkCreate(temparray).then(function (response) {
                    k += response.length;
                    //  Only send the response on the last temparray
                    if (k == uniqueRecipients.length) {
                        // The UI just needs to know there was at least 1 recipient
                        if(uniqueRecipients.length > 0) {
                            wrapper.recipientData = _.first(wrapper.recipientData, 1);
                        }
                        afterAllInserts(wrapper);
                    }
                }).error(function (err) {
                    if (err)
                        results.insertErrors.push(next(err));
                    afterAllInserts(wrapper);
                });
            }
        });

        _.each(newMessage.distributeToData,function(distributionGroup){
            _.each(distributionGroup,function(value,property){
                if (property == "positionIDs") {
                    distributionGroup.distributeByCategoryID = 9;
                    var positionNamesArray = distributionGroup["positionNames"].split(",");
                    var positionIDsArray = distributionGroup["positionIDs"].split(",");
                    if (parseInt(positionIDsArray[0]) == 28) {
                        positionIDsArray = allPositionsIDsArray;
                        positionNamesArray = allPositionsNamesArray;
                    }
                    // Executes after the _.each distributeToData loop is finished
                    var afterAllPositions = _.after(positionIDsArray.length,function(results){
                        afterAllDistributionGroups(results);
                    });
                    // Executes after the _.forOwn positionIDsArray loop is finished
                    _.forOwn(positionIDsArray, function(positionID,positionIndex){
                        InsertMsgDistributedTo(msgID, distributionGroup.distributeByCategoryID, positionID, positionNamesArray[positionIndex], distributionGroup.tagsinputLength, wrapper );
                        if (distributionGroup.distributeByField != "emailL1" && distributionGroup.distributeByField != "emailL2") {
                            async.waterfall([
                                function(callback) {
                                    MsgRecipientsByAccountResponsibility(allPositionsObj, positionID, distributionGroup.distributeByField, distributionGroup.filterID, msgID, wrapper,callback)
                                }
                            ], function(err,wrapper) {
                                afterAllPositions(wrapper);
                            })
                        } else {
                            async.waterfall([
                                function(callback) {
                                    MsgRecipientsByEmployeeResponsibility(allPositionsObj, positionID, distributionGroup.distributeByField, distributionGroup.filterID, msgID, wrapper,callback)
                                }
                            ], function(err,wrapper) {
                                afterAllPositions(wrapper);
                            })
                        }
                    });
                } else if (property == "distributeByField") {
                    InsertMsgDistributedTo(msgID, distributionGroup.distributeByCategoryID, distributionGroup.filterID, distributionGroup.filterName, distributionGroup.tagsinputLength, wrapper );
                }
            });
        });
        afterAllInserts(wrapper);
    }).error(function (err) {
        if (err) {
            wrapper.insertErrors.push(next(err));
            afterAllInserts(wrapper);
        }
    });
};



/**
 *
 * UPDATE a message
 */
var updateMessage = function(req, res, next) {
    var messageData = req.body.data;
    messageData = messageData[0];
    var msgID = req.params.msgID;
    //console.log("messageData: " + JSON.stringify(messageData))
    messageData.hasAttachment = 0;
    if (typeof messageData.messageAttachmentList !== "undefined"){
        if(messageData.messageAttachmentList.length>0) {
            messageData.hasAttachment = 1;
        }
    }

    if (messageData.actionDate == ""){
        messageData.actionDate = null;
    }

    var forcedUnread = false;
    if (typeof messageData.isRead !== "undefined"){
        forcedUnread = true;
    }

    var wrapper = {
        "recipientData": [],
        "insertErrors": []
    };
    var numberOfUpdates = 2;  //  2 Because we are updating message content and getting old recipient list with EVERY update
    if(messageData.attachmentDataHasChanged == "true"){
        numberOfUpdates++;
    }
    if(messageData.messageTagsDataHasChanged == "true"){
        numberOfUpdates++;
    }
    if(forcedUnread == true){
        numberOfUpdates++;
    }
    if(messageData.distributeToDataHasChanged == "true"){
        numberOfUpdates++;
    }

    //  Will execute after numberOfUpdates (all updates) are complete
    var afterAllUpdates = _.after(numberOfUpdates, function (results) {
        results.recipientData = _.first(results.recipientData, 1);  // The UI just needs to know there was at least 1 recipient
        return res.status(200).json({
            results: results
        });
    });

    MessageModel.update(messageData, {where: {ID: msgID}}).then(function () {
        afterAllUpdates(wrapper);
    }).error(function (err) {
        if (err) {
            wrapper.insertErrors.push(next(err));
            afterAllUpdates(wrapper);
        }
    });

    //  Get the old recipient list because:
    //  1:
    //    When updating a message, the recipient list may be altered. Since we want to keep a history of recipients
    //    who received previous versions of an edited message, we put them in the wrapper
    //  2:
    //    So the UI can determine whether to display the NO_RECIPIENTS warning or not
    msgRecipients.findAll({where: {msgID: msgID}}).then(function (readCurrentRecipientData) {
        if (readCurrentRecipientData) {
            for (var x = 0; x < readCurrentRecipientData.length; x++) {
                var recipient = JSON.parse(JSON.stringify(readCurrentRecipientData[x]));
                var recipientData = {
                    "msgID": msgID,
                    "email": recipient["email"].toString(),
                    "isRead": recipient["isRead"],
                    "isArchived": recipient["isArchived"],
                    "isFlagged": recipient["isFlagged"]
                };
                wrapper.recipientData.push(recipientData);
            }
            afterAllUpdates(wrapper);
        } else {
            afterAllUpdates(wrapper);
        }
    }).error(function (err) {
        if (err) {
            wrapper.insertErrors.push(next(err));
            afterAllUpdates(wrapper);
        }
    });

    if (messageData.attachmentDataHasChanged == "true"  && typeof messageData.messageAttachmentList !== "undefined") { //&& messageData.messageAttachmentList != ""
        // -- Delete all documents from this message first
        msgDocuments.destroy({where: {msgID: msgID}});
        // -- Then Insert the docs in msgDocumentIDs
        afterAllUpdates(BuildMsgDocumentRecords(messageData, msgID, wrapper));
    }

    if (messageData.messageTagsDataHasChanged == "true") {
        // -- Delete all tags from this message first
        msgTags.destroy({where: {msgID: msgID}});
        // -- Then Insert the tags in msgTagIDs
        afterAllUpdates(BuildMsgTagRecords(messageData, msgID, wrapper));
    }

    // -- If a messages was forced as unread then
    if (typeof messageData.isRead !== "undefined") {
        msgRecipients.update({isRead: messageData.isRead}, {where: {msgID: msgID}}).error(function (err) {
            if (err) {
                wrapper.insertErrors.push(next(err));
                afterAllUpdates(wrapper);
            }
        }).then(function(){
            afterAllUpdates(wrapper);
        });
    }

    // If no distribution data has changed we don't need to update distribution data or recipient data
    if (messageData.distributeToDataHasChanged == "true") {
        msgRecipients.destroy({where: {msgID: msgID}});
        //delete the dist info and insert new dist info
        var distributeToData = messageData.distributeToData;
        // Executes after the _.each distributeToData loop is finished
        var afterAllDistributionGroups = _.after(distributeToData.length, function (results) {
            var i, j, k = 0, temparray, chunk = 1000; //  Sequelize bulkCreate is limited to 1000 records at a time
            var uniqueRecipients = _.uniq(results.recipientData, "email");
            for (i = 0, j = uniqueRecipients.length; i < j; i += chunk) {
                temparray = uniqueRecipients.slice(i, i + chunk);
                msgRecipients.bulkCreate(temparray).then(function (response) {
                    k += response.length;
                    //  Only send the response on the last temparray
                    if (k == uniqueRecipients.length) {
                        // The UI just needs to know there was at least 1 recipient
                        if(uniqueRecipients.length>0) {
                            wrapper.recipientData = _.first(wrapper.recipientData, 1);
                        }
                        afterAllUpdates(wrapper);
                    }
                }).error(function (err) {
                    if (err)
                        results.insertErrors.push(next(err));
                    afterAllUpdates(wrapper);
                });
            }
        });
        // -- Delete all distributedTo from this message first
        msgDistributedTo.destroy({where: {msgID: msgID}});
        _.each(distributeToData, function (distributionGroup) {
            var distributeByField = distributionGroup.distributeByField;
            _.each(distributionGroup, function (value, property) {
                if (property == "positionIDs") {
                    distributionGroup.distributeByCategoryID = 9;
                    var positionNamesArray = distributionGroup["positionNames"].split(",");
                    var positionIDsArray = distributionGroup["positionIDs"].split(",");
                    if (positionIDsArray[0] == 28) { //  "ALL Positions" was chosen in a positions dropdown
                        positionIDsArray = allPositionsIDsArray;
                    }
                    // Executes after the _.each distributeToData loop is finished
                    var afterAllPositions = _.after(positionIDsArray.length, function (results) {
                        afterAllDistributionGroups(results);
                    });
                    // Executes after the _.forOwn positionIDsArray loop is finished
                    _.forOwn(positionIDsArray, function (positionID, positionIndex) {
                        InsertMsgDistributedTo(msgID, distributionGroup.distributeByCategoryID, positionID, positionNamesArray[positionIndex], distributionGroup.tagsinputLength, wrapper );
                        //  Determine if this is Account Responsibility or Employee Responsibility
                        if (distributionGroup.distributeByField != "emailL1" && distributionGroup.distributeByField != "emailL2") {
                            async.waterfall([
                                function(callback) {
                                    MsgRecipientsByAccountResponsibility(allPositionsObj, positionID, distributionGroup.distributeByField, distributionGroup.filterID, msgID, wrapper,callback)
                                }
                            ], function(err,wrapper) {
                                afterAllPositions(wrapper);
                            })
                        } else {
                            async.waterfall([
                                function(callback) {
                                    MsgRecipientsByEmployeeResponsibility(allPositionsObj, positionID, distributionGroup.distributeByField, distributionGroup.filterID, msgID, wrapper,callback)
                                }
                            ], function(err,wrapper) {
                                afterAllPositions(wrapper);
                            })
                        }
                    });
                } else if (property == "distributeByField") {
                    InsertMsgDistributedTo(msgID, distributionGroup.distributeByCategoryID, distributionGroup.filterID, distributionGroup.filterName, distributionGroup.tagsinputLength, wrapper );
                }
            });
        });
    }

};

/**
 *
 * DELETE a message
 */
var deleteMessage = function (req, res) {
    var msgID = req.params.msgID;
    var results = {deletedMsgData: false};
    //  Delete Options for tables related to MSGS table
    var deleteOptions = {where: {msgID: msgID}};
    //  Delete options for the MSGS table
    var deleteMsgsOptions = {where: {ID: msgID}};

    var deletedMessage = {"tables" : [
        {dbObject: msgTags, options: deleteOptions},
        {dbObject: msgDocuments, options: deleteOptions},
        {dbObject: msgDistributedTo, options: deleteOptions},
        {dbObject: msgRecipients, options: deleteOptions},
        {dbObject: MessageModel, options: deleteMsgsOptions}
    ]};

    //  Will execute after all deletes are complete
    var afterAllDeletes = _.after(deletedMessage.tables.length, function () {
        results.deletedMsgData = true;
        return res.status(200).json({
            results: results
        });
    });

    _.forEach(deletedMessage.tables, function(table){
        table.dbObject.destroy(table.options).then(function () {
            afterAllDeletes();
        }).error(function (err) {
            if (err) {
                results.deletedMsgData = false;
                return res.status(200).json({
                    results: results
                });
            }
        });
    });
};

/**
 * POST /messages/validateCustomAccountList
 * Validate list of accounts and return
 * strings indicating both valid and invalid accounts
 */
var validateCustomAccountList = function (req, res) {
	var accountList = req.body.data;
	var accountsArray = accountList[0]["customAccountListIDs"].split(',');
    accountsArray = accountsArray.map(Number);

    var accountValidation =  {
        "validAccounts": [],
        "invalidAccounts": []
    };

    var validAccountsArray = [];
	var invalidAccountsArray = [];

    var accountInfoOptions = {};
    accountInfoOptions["where"] = {accountNum: {$not: null}};
    accountInfoOptions["attributes"] = ['accountNum'];

    accountInfo.findAll(accountInfoOptions).then(function(accountNums) {
        for (var x = 0; x < accountsArray.length; x++) {
            if (isNaN(accountsArray[x])){
                return res.status(422).json(
                    accountValidation = "CUSTOM_ACCOUNT_NO_COMMAS_FOUND"
                    //validAccounts: validAccountsArray,
                    //invalidAccounts: invalidAccountsArray
                )
            } else {
                var valid = accountNums.filter(function (data) {
                    return data.accountNum == accountsArray[x];
                });
                if (valid != "") {
                    validAccountsArray.push(accountsArray[x]);
                } else {
                    invalidAccountsArray.push(accountsArray[x]);
                }
            }
        }
        /*
		_.map(accountsArray, function(num) {
			if (_.contains(accountNums, num)) {
                validAccountsArray.push(num);
				return num;
			}
			else {
                invalidAccountsArray.push(num);
			}
		});
		*/

        accountValidation["validAccounts"] = validAccountsArray;
        accountValidation["invalidAccounts"] = invalidAccountsArray;
		return res.status(200).json(
            accountValidation
			//validAccounts: validAccountsArray,
			//invalidAccounts: invalidAccountsArray
		)
	})
};

module.exports = {
    readByFieldValue: readByFieldValue,
	readMessageModel: readMessageModel,
    getMessagesToEdit: getMessagesToEdit,
    getTypes: getTypes,
    getPriorities: getPriorities,
    getSaveStatuses: getSaveStatuses,
    distributeByCategory: distributeByCategory,
    insertNewMessage: insertNewMessage,
    updateMessage: updateMessage,
    deleteMessage: deleteMessage,
    validateCustomAccountList: validateCustomAccountList
};