var update = document.getElementById('update');

update.addEventListener('click', function() {
	//Fetch is a function provided in the global window scope.
	//Fetch is an API that takes in two parameters. First is a "path"--where we send
	//our request. We send it to /quotes, which will be handled by server. 
	//Second param is "options", which is a optional object that allows you to 
	//control settings like method/headers/body.

	//Fetch returns a promise Response object instance.
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
//our PUT request to /quotes
//convert quote to JSON format to send in request body
//boolean for successful Fetch response
//a Fetch response instance has the .json() method, 
//which returns a promise that resolves with a JSON object.