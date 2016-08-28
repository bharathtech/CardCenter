// modules =================================================
var express        = require('express');
var bodyParser     = require('body-parser');


var app            = express();


// set our port
var port = process.env.PORT || 8888;



app.use(express.static(__dirname + '/public',{index:'index.html'}));


// get all data/stuff of the body (POST) parameteros
// parse application/json 
app.use(bodyParser.json()); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


app.use('/api', require('./app/routes/api'));



// start app ===============================================
// startup our app at specified port
app.listen(port);               

// shoutout to the user                     
console.log('app running on port ' + port);


// expose app           
exports = module.exports = app;                         



