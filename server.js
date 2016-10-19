"use strict";

const express = require('express');
const app = express();

//created the server with express listening at port 3000
app.listen(3000, function() {
	console.log('listening on 3000');
});

//CRUD-READ: app.get(pathname, callback)
//when user wants to get this pathname
//__dirname is the path to current working directory
//sendFile: Express serves an index.html file found in root folder
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

