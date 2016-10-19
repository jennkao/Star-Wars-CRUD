"use strict";

//Body parser is a middleware, which is basically a plugin that change
//the request or response object before they get handled by the app
//it needs to be placed before CRUD handlers
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var db;

var linkToMongo='mongodb://jennkao:92mongo@ds021751.mlab.com:' + 
'21751/star-wars-quotes'; //link to our Mongo db hosted on mongo cloud
MongoClient.connect(linkToMongo, (err, database) => { 
	if (err) {
		return console.log(err);
	}
	db = database; //database parameter contains the initialized db object or 
	//null if an error connecting to db occurs; db is global var

	//create the server with express listening at port 3000
	app.listen(3000, () => {
		console.log('listening on 3000');
	});
});

//CRUD-READ: app.get(pathname, callback)----------------------
//when user wants to get this pathname
//__dirname is the path to current working directory
//sendFile: Express serves an index.html file found in root folder
app.get('/', (req, res) => {
	//a cursor is a mongo object that contains all the quotes from our db
	//along with properties/methods that allow us to work with data easily
	//the collection. the find method returns a cursor.
	db.collection('quotes').find().toArray(function(err, results) {
		//cursor.toArray() returns an array of all documents from a cursor
		if (err) {
			return console.log(err);
		}
		console.log(results);
		//renders the index.ejs file. first parameter is the file we are rendering
		//the second is an object that passes data to the view
		res.render('index.ejs', {quotes: results});
	});
});


//CRUD-CREATE: app.post(pathname, callback)-------------------
//Form: action attribute tells browser where to navigate in our
//Express app. Method tells browser what request to send.

//urlencoded method tells body-parser to extract data from the form
//and add that data to request.body property
app.use(bodyParser.urlencoded({extended: true}));

app.post('/quotes', (req, res) => {
	//create a collection called 'quotes' using db.collection(collection-name)
	//save our first entry into MongoDB using save(doc to save, callback)
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) {
			return console.log(err);
		}
		console.log('saved to database');
		res.redirect('/'); //we redirect the user back to /
	});
});

//set the view engine in Express to Embedded Javascript, a template engine that
//break HTML code into smaller pieces that we can reuse in multiple html files.
app.set('view engine', 'ejs');
//syntax ~ res.render(view, locals) -- step is in the .get('/') above
//after view engine is set, we can start generating HTML--called rendering.
//can use render object built into the response object. *Views* is the name of 
//the file we're rendering, and this file must be placed in a views folder.
//*Locals* is an object that passes data into the view




