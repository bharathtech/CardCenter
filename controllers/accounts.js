/**
 * Account Information Controller
 */

'use strict';

var db = require('../config/database');
var _ = require('lodash');

var AccountInfoModel = db.accountInfo;

// Controller for reading all messages (no recipients)
var listAccounts = function (req, res, next) {

	var limit = req.query.take;
	var offset = req.query.skip;

/*	var logic = req.query.filter[logic];
	var field = req.query.filter[filters][0][field];
	var operator = req.query.filter[filters][0][operator];
	var value = req.query.filter[filters][0][value];*/

	// Get all accounts where user is
	AccountInfoModel.findAndCountAll({
		attributes: ['accountNum', 'storeName', 'address', 'city', 'postalCode', 'stateCode', 'telephone', 'openDate'],
		offset: offset,
		limit: limit
	})
		.then(function (accounts) {
			if (accounts) {
				return res.status(200).json({
					accounts: accounts
				})
			}
		}).error(function (err) {
		if (err) return next(err);
	});
};

module.exports = {
	listAccounts: listAccounts
};
