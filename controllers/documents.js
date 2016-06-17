/**
 * Documents Controller
 */

'use strict';

var sp = require('../middleware/sharepoint');

/**
 * GET documents handler
 */
var getDocuments = function(req,res){

	var querytext = 'a'; //req.query.mytext;

	var options = {
		querytext: querytext
	};

	sp.search(options, function(searchres) {
        //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@searchres: " + JSON.stringify(searchres))
		res.status(200).json(searchres)
	})

};

module.exports = {
    getDocuments: getDocuments
};
