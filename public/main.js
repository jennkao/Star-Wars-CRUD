//Fetch is a function provided in the global window scope.
//Fetch is an API that takes in two parameters. First is a "path"--where we send
//our request. We send it to /quotes, which will be handled by server. 
//Second param is "options", which is a optional object that allows you to 
//control settings like method/headers/body.

//We are making a PUT request through Fetch to /quotes, which returns a 
//promise Response object instance.
//'Then' method is triggered when the promise is resolved (vs. rejected), and 
// it receives the result of the promise. You can chain ".then" callbacks, which
//each take the return value of the previous .then callback. If the promise
//is rejected, the following ".then" is not called.
//Response.ok is a boolean for successful Fetch response
//A Fetch response instance has the .json() method, 
//which returns a promise that resolves with a JSON object.

var update = document.getElementById('update');
update.addEventListener('click', function() {
	fetch('quotes', { 
		method: 'put',
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify({ 
			'name': 'Darth Vader',
			'quote': 'I find your lack of faith disturbing.'
		})
	}).then(res => {
		if (res.ok) { 
			return res.json();
		}
	}).then(data => {
		console.log(data);
		window.location.reload(true);
	});
});
//We have to parse the response in the first .then callback because
//MongoDB uses JSON to store documents.
//Also, the .then()s don't do anything functional but log the quote in JSON
//to the console. Window.location.reload(true) --> optional parameter Boolean,
//which when true causes the page to the reloaded from the server instead of the
//cache to reflect our changes to the db.

var del = document.getElementById('delete');
del.addEventListener('click', function() {
	fetch('quotes', {
		method: 'delete',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name': 'Darth Vader'
		})
	}).then(res => {
		if (res.ok) {
			return res;
		}
	}).then(data => {
		console.log(data);
		window.location.reload(true);
	});
});

//We don't need to parse the response for JSON because we sent a string
//as our response.