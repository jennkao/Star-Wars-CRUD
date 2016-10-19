"use strict";

//Body parser is a middleware, which is basically a plugin that change
//the request or response object before they get handled by the app
//it needs to be placed before CRUD handlers
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var db;

//urlencoded method tells body-parser to extract data from the form
//and add that data to request.body property
app.use(bodyParser.urlencoded({extended: true}));

//CRUD-READ: app.get(pathname, callback)
//when user wants to get this pathname
//__dirname is the path to current working directory
//sendFile: Express serves an index.html file found in root folder
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

//CRUD-CREATE: app.post(pathname, callback)
//Form: action attribute tells browser where to navigate in our
//Express app. Method tells browser what request to send.
app.post('/quotes', (req, res) => {
	console.log(req.body);
});


var linkToMongo='mongodb://<jennkao>:<92mongo>@ds021751.mlab.com:' + 
'21751/star-wars-quotes'; //link to our Mongo db hosted on mongo cloud
MongoClient.connect(linkToMongo, (err, database) => { 
	if (err) {
		return console.log(err);
	}
	db = database; //database parameter contains the initialized db object or 
	//null if an error connecting to db occurs;

	//create the server with express listening at port 3000
	app.listen(3000, function() {
		console.log('listening on 3000');
	});

});





