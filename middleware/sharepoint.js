/**
 * Documents Controller
 */

'use strict';

var _ = require('lodash');
var ntlm = require('./ntlm');
var httpntlm = require('httpntlm');
var async = require('async');
var httpreq = require('httpreq');

var fs = require('fs');
var url = require('url');

var keepaliveAgent;
var HttpsAgent = require('agentkeepalive').HttpsAgent;
keepaliveAgent = new HttpsAgent();

exports.search = function(o, cb) {

	var querytext = "'" + o.querytext + "'";

	var options = {
		url: 'https://qasa2.hallmark.com/sites/testnav/sr/_api/search/query?querytext=' + querytext,
		username: 'jclark53',
		password: 'Hallmark999',
		workstation: '',
		domain: 'hmk_master'
	};

	if(!options.workstation) options.workstation = '';
	if(!options.domain) options.domain = '';

	// extract non-ntlm-options
	var httpreqOptions = _.omit(options, 'url', 'username', 'password', 'workstation', 'domain');

	// is https?
	// set keepaliveAgent (http or https)
	var isHttps = false;
	var reqUrl = url.parse(options.url);
	if(reqUrl.protocol == 'https:') isHttps = true;

	async.waterfall([
		function ($){
			var type1msg = ntlm.createType1Message(options);

			// build type1 request
			var type1options = {
				headers:{
					'Connection' : 'keep-alive',
					'Authorization': type1msg
				},
				timeout: options.timeout || 0,
				agent: keepaliveAgent
			};

			// add timeout option
			if(httpreqOptions.timeout) type1options.timeout = httpreqOptions.timeout;

			// send type1 message to server
			httpreq['get'](options.url, type1options, $);
		},

		function (res, $){

			if(!res.headers['www-authenticate'])
				return $(new Error('www-authenticate not found on response of second request'));

			// parse type2 message from server
			var type2msg = ntlm.parseType2Message(res.headers['www-authenticate']);

			// create type3 message
			var type3msg = ntlm.createType3Message(type2msg, options);

			// build type3 request
			var type3options = {
				headers: {
					'Connection': 'Close',
					'Authorization': type3msg,
					'accept': "application/json; odata=verbose"
				},
				allowRedirects: false,
				agent: keepaliveAgent
			};

			// pass through other options
			type3options.headers = _.extend(type3options.headers, httpreqOptions.headers);
			type3options = _.extend(type3options, _.omit(httpreqOptions, 'headers'));

			//console.log('type3 --> ' + JSON.stringify(type3options.headers));
			// send type3 message to server
			httpreq['get'](options.url, type3options, $);
		}
	], function (err, res) {
		if(err) return console.log(err);

		cb(res.body);
		//resp.json(res.body);
	});

};

