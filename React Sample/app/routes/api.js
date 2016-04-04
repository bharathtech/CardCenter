var express  = require('express');
var router   = express.Router();
var fs = require('fs');


//url:			/api/property
//method:		GET
//Description:	Endpoint to Get Property locale from json
router.get('/property', function(req, res) {
	var path =  __dirname+ '/../json/locale.json';
	 fs.readFile(path, function(err, data) {
	 	if (err) {
	      console.error(err);
	      process.exit(1);
	    }

	    var query = req.query.q; //get searchTerm

	    //parse JSON read from file
	    var locales = JSON.parse(data);

	    var results =[];

	    //manipulate results for the property
	    for(var locale in locales){
	    	if(locales[locale][query]){
	    		results.push({lang: locale, value: locales[locale][query]});
	    	}
	    }

	    res.json(results);
	 });
});

module.exports = router;