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

		//Asychronously read the requestedResource and send the contents to the client
		fs.readFile(requestedResource, "binary", function(err, file){
			//Send out a 500 Internal Error if there is an issue reading the file
			if(err){
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}

			//Map request extensions to response mime types using a Helper Object

			const contentTypesByExtension = {
				'.html': "text/html",
				'.css': "text/css",
				'.js': "text/javascript"
			};

			//Helper Object to hold headers
			const headers = {};
			const contentType = contentTypesByExtension[path.extname(requestedResource)];
		})
	})
}