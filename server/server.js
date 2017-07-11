import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

// Function to be used as a callback to createServer method
// It handles incoming request and sends the response.

function reqeustHandler(request, response) {
	//resolve the path to the requested resource and assign it to a variable 

	let requestedResource = path.join(__dirname, '../public',
		url.parse(request.url).pathname); //path to resource requested by client

	//use the exists method of fs package to check if requestedResource exists
	fs.exists(requestResource, function(exists){
		//if file does not exist give 404
		if(!exist){
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found \n");
			response.end();
			return;
		}

		//If requestedResource is a directory set index.html page as the requested resource.
		if(fs.statSync(requestedResource).isDirectory()){
			requestedResource += '/index.html';
		}
	})
}