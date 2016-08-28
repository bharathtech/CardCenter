/**
 * Message Inbox Controller
 */

'use strict';

var settings = require('../config/env/default');
var db = require('../config/database');
var _ = require('lodash');

var UserModel = db.user;
var Message = db.MSGS;
var Recipient = db.msgRecipients;
var Priorities = db.msgPriorities;
var Types = db.msgTypes;
var InfoClasses = db.admInformationClassifications;
var Statuses = db.msgSaveStatuses;
var Tags = db.msgTags;
var AdmTags = db.admTags;
var Docs = db.msgDocuments;


Recipient.belongsTo(Message, {foreignKey: 'msgID'});
Message.belongsTo(Priorities, {foreignKey: 'priorityID'});
Message.belongsTo(Types, {foreignKey: 'typeID'});
Message.belongsTo(InfoClasses, {foreignKey: 'informationClassificationID'});
Message.belongsTo(Statuses, {foreignKey: 'saveStatusID'});
Tags.belongsTo(AdmTags, {foreignKey: 'tagID'});


// Controller for reading all messages (no recipients)
var listMessages = function (req, res, next) {

	// Obtain the users data from the deserialized token
	UserModel.findById(req.user.id)
		.then(function (user) {

			if (user) {

				// Return list of all messages

			}

		}).error(function (err) {
		if (err) return next(err);
	});

};


var singleMessage = function (req, res, next) {

	// Obtain the users data from the deserialized token
	UserModel.findById(req.user.id)
		.then(function (user) {

			if (user) {

				// Return single message
			}

		}).error(function (err) {
			if (err) return next(err);
		});

};


// Controller for reading messages
var listRecipientMessages = function (req, res, next) {

	var search = req.query.search;
	var inbox = req.query.inbox;
	var archive = req.query.archive;
	var priority = req.query.priority;
	var hasAttachment = req.query.hasAttachment;
	var isFlagged = req.query.isFlagged;
	var tagFilter = req.query.tags;
	var publishStartDate = req.query.publishStartDate;
	var publishEndDate = req.query.publishEndDate;
	var employeeFilter = req.query.employeeFilter;
	var isRead = req.query.isRead;

	// Obtain the users data from the deserialized token
	UserModel.findById(req.user.id)
		.then(function (user) {

			if (user) {

				// Models to include in messages instance
				var include = [
					{ model: Message,
						include: [
							{ model: Priorities, attributes: ['priority']},
							{ model: Types, attributes:['type']},
							{ model: InfoClasses, attributes:['informationClassification']},
							{ model: Statuses, attributes: ['saveStatus']}
						]
					}
				];

				var where = employeeFilter ? { email: employeeFilter } : { email: user.email };

				if (isRead) {
					where.isRead = false;
				}

				if (isFlagged) {
					where.isFlagged = true;
				}

				if (tagFilter) {
					var sql = "SELECT msgID FROM [DEV_SANDBOX].[msgTags] " +
							  "WHERE tagID = ( SELECT ID FROM [DEV_SANDBOX].[admTags] " +
						                      "WHERE tagName = '" + tagFilter + "')";

					where.msgID = {
						$in: [db.sequelize.literal(sql)]
					};
				}

				if (inbox == 'true' && archive == 'false') {
					where.isArchived = false;
				}
				else if (inbox == 'false' && archive == 'true') {
					where.isArchived = true;
				}

				if (search) {
					include[0].where = {
						$or: [
							{ 'subject': { $like: '%' + search + '%' }},
							{ 'body': { $like: '%' + search + '%' }}
						]
					}
				}

				if (hasAttachment) {
					if (include[0].where) {
						include[0].where.hasAttachment = true;
					} else {
						include[0].where = { hasAttachment: true };
					}
				}

				if (publishStartDate && publishEndDate) {
					if (include[0].where) {
						include[0].where.publishDate = {
							$lte: publishEndDate,
							$gte: publishStartDate
						};
					} else {
						include[0].where = { publishDate: {
							$lte: publishEndDate,
							$gte: publishStartDate
						}};
					}
				}

				if (priority) {
					include[0].include[0].where = { ID: 1 };
				}

				// Get all messages where current user is recipient
				Recipient.findAll({
					where: where,
					include: include
				}).then(function (recipientMsg) {
					if (recipientMsg) {

						var msgObject = [];
						var tagsOutput = null;

						// These are the nested nodes that need to be flattened
						var elementsToOmit = ['msgPriority','msgSaveStatus','msgType','admInformationClassification'];

						// Flatten out the message JSON so all properties are in the first object
						_.forEach(JSON.parse(JSON.stringify(recipientMsg)), function (prop, key) {
							msgObject.push(_.extend(
								_.omit(prop, 'MSG'), _.extend(
									_.omit(prop.MSG, elementsToOmit), prop.MSG.msgPriority, prop.MSG.msgSaveStatus, prop.MSG.msgType, prop.MSG.admInformationClassification
								)
							))
						});

						var tagsInclude = [{
							model: AdmTags, attributes: ['tagName']
						}];

						// Get a list of tags associated with messages
						Tags.findAll({
							attributes: ['msgID'],
							include: tagsInclude
						}).then(function(tags){
							if (tags) {

								// Flatten out the tags into arrays
								tagsOutput = _(tags)
									.groupBy('msgID')
									.mapValues(function(group) {
										return _.map(group, 'admTag.tagName');
									})
									.value();

								// Add the proper tags to the messages
								_.forEach(msgObject, function(prop, key){
									prop.tags = [];
									prop.tags = tagsOutput[prop.msgID];
								});

								//console.log("messages wrapper: " + JSON.stringify(wrapper)) ;
								return res.status(200).json({
									messages: msgObject
								})

							}
						});

					}
				}).error(function (err) {
					if (err)
						return next(err);
				});

			}

		}).error(function (err) {
		if (err) return next(err);
	});

};

var updateMessage = function (req, res, next) {


	// Obtain the users data from the deserialized token
	UserModel.findById(req.user.id)
		.then(function (user) {

			if (user) {

				Recipient.findOne({
					where: {
						msgID: req.body.ID,
						email: req.session.employee.email
					}
				})
					.then(function (recipient) {
						if (recipient) {

							recipient.isRead = req.body.isRead || '';
							recipient.isArchived = req.body.isArchived || '';
							recipient.isFlagged = req.body.isFlagged || '';

							recipient.save().then(function() {
								res.status(200).json({
									success: [{
										msg: 'Update Complete'
									}]
								})
							});
						}

				}).error(function (err) {
					if (err) return next(err);
				});

			}

		}).error(function (err) {
			if (err) return next(err);
		});

};




module.exports = {
	listMessages: listMessages,
	singleMessage: singleMessage,
	listRecipientMessages: listRecipientMessages,
	updateMessage: updateMessage
};
