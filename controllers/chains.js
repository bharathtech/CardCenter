/**
 * Chain Controller
 */

'use strict';

var db = require('../config/database');

var ChainModel = db.chains;


// Controller for reading all chains
var listChains = function (req, res, next) {

	// Read chain table to get list of all chains
	ChainModel.findAll()
		.then(function (chains) {

			if (chains) {

				// Return list of all chains
				return res.status(200).json({
					chains: chains
				})

			}

		}).error(function (err) {
		if (err) return next(err);
	});

};


module.exports = {
	listChains: listChains
};