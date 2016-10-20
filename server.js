"use strict";

//Express is a routing and middleware web framework--the app is essentially a 
//series of middleware function calls. Middleware functions hve access to request,
//response

//Body parser is a middleware, which is basically a plugin that changes
//the request or response object before they get handled by the app.
//It needs to be placed before CRUD handlers.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var db;

var linkToMongo='mongodb://jennkao:92mongo@ds021751.mlab.com:' + 
'21751/star-wars-quotes'; //link to our Mongo db hosted on MongoLabs.
MongoClient.connect(linkToMongo, (err, database) => { 
	if (err) {
		return console.log(err);
	}
	db = database; //Database parameter contains the initialized db object or 
	//null if an error connecting to db occurs; db is global var declared above.

	//Create the server with express listening at port 3000
	app.listen(3000, () => {
		console.log('listening on 3000');
	});
});

//CRUD-READ: app.get(pathname, callback)----------------------
//When user wants to access this pathname on browser.
//__dirname is the path to current working directory.
//SendFile: Express serves an index.html file found in root folder
app.get('/', (req, res) => {
	//A cursor is a Mongo object that contains all the quotes from our db
	//along with properties/methods that allow us to work with data easily
	//the collection. The find method returns a cursor.
	db.collection('quotes').find().toArray(function(err, results) {
		//Cursor.toArray() returns an array of all documents from a cursor
		if (err) {
			return console.log(err);
		}
		//Renders the index.ejs file. First parameter is the file we are rendering
		//and the second parameter is an object that passes data to the view.
		res.render('index.ejs', {quotes: results});
	});
});


//CRUD-CREATE: app.post(pathname, callback)-------------------
//Form: action attribute tells browser where to navigate in our Express app. 
//Method tells browser what request to send.

//Bodyparser is a middleware, think of it as a black box
//Urlencoded method tells body-parser to extract data from the form
//and add that data to request.body property; parses the data as URL encoded
//data--which is how browsers send form data from regular forms set to POST.
app.use(bodyParser.urlencoded({extended: true}));

app.post('/quotes', (req, res) => {
	//Create a collection called 'quotes' using db.collection(collection-name)
	//save our first entry into MongoDB using save(doc to save, callback)
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) {
			return console.log(err);
		}
		console.log('saved to database');
		res.redirect('/'); //we redirect the user back to /
	});
});

//Set the view engine in Express to Embedded Javascript, a template engine that
//break HTML code into smaller pieces that we can reuse in multiple html files.
app.set('view engine', 'ejs');
//SYNTAX ~ res.render(view, locals) -- step is in the .get('/') above
//After view engine is set, we can start generating HTML--called rendering.
//Can use render object built into the response object. *Views* is the name of 
//the file we're rendering, and this file must be placed in a views folder.
//*Locals* is an object that passes data into the view

//CRUD-UPDATE: 
//Express.static is a middleware. We create a file called 'public' that will 
//contain our static resources. The following line tells Express to match any 
//routes for files fond in this folder and deliver files directly to the browser.
app.use(express.static('public'));
//Bodyparser.json() parses request body text as JSON and exposes the resulting 
//object on req.body
app.use(bodyParser.json());

//Every db comes with a method called findOneAndUpdate that allows you to 
//change one item from db. Takes four parameters: query, update, options,
//callback. *Query* allows you to filer the collection through key value pairs
//given to it. *Update* tells Mongo what to do with the update request and uses 
//MongoDB's update operators. *Options* is an optional parameter that allows you to 
//define additional criteria eg. search through db start from newest entry; 
//upsert option: insert or save if no entries are found. *Callback* allows you to 
// to do something once MongoDB has completed the update.

//When user clicks on #update button, browser sends a put request through Fetch
//to our server. Than our server responds by sending a changed quote back to 
//Fetch.
app.put('/quotes', (req, res) => {
	db.collection('quotes').findOneAndUpdate(
		{ name: 'Yoda'},
		{	$set: 
			{ name: req.body.name,
			quote: req.body.quote } },
		{ sort: {_id:-1 },
			upsert: true}, 
		(err, result) => {
			if (err) {
				return res.send(err);
			}
			res.send(result);
		}
	)
});


