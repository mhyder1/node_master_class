/*
Primary file for API
*/

//Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//The server should respond to all requests with a string
const server = http.createServer((req, res) => {

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Get the query string as an object i.e. ?fizz=buzz&foo=bar
    const queryStringObject = parsedUrl.query;

    // Get http method i.e. GET, POST, PUT, DELETE
    const method = req.method.toLowerCase();
    
    // Get the headers as an object
    const headers = req.headers;
    
    // Get the payload, if any
    const decoder = new StringDecoder('UTF-8');
    
    // Buffer starts off empty
    let buffer = '';
    
    // As data comes in gradually add it to the buffer
    req.on('data', data => { // bind to data event of stream
        buffer += decoder.write(data);
    });
    
    // When data is finish being received... 
    req.on('end', () => {
        buffer += decoder.end();
        
    // Choose the handler this request should go to. If one is not found, use the not found hanlder
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        
    // Construct data object to send to the handler
    const data = {
        'trimmedPath': trimmedPath,
        'queryStringObject': queryStringObject,
        'method': method,
        'headers': headers,
        'payload': buffer
    }
        
    // Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload) {
        // Use the status code called back by the handler, or default to 200
        statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
        
        // Use the payload called back by the handler, or default to to an empty object
        payload = typeof(payload) === 'object' ? payload : {};
        
        // Convert the payload to a string
        const payloadString = JSON.stringify(payload);
        
        // Return the response
        res.writeHead(statusCode);
        res.end(payloadString);
        
        // Log the request path
        console.log('Returning this response: ', statusCode, payloadString);
    })
        
        
    // ...send the response to client
    res.end('Hello World\n');

    
    })
})


//Start the server, and hav it listen on prot 3000
server.listen(3000, () => {
    console.log('The server is listening on port 3000');
})

// Define the handlers
const handlers = {}

// Sample handler
handlers.sample = function(data, callback) {
// Callback a http status code, and a payload object
    callback(406, {'name': 'sample handler'})
}

// Not found handler
handlers.notFound = function(data, callback) {
    callback(404)
}

// Define request router
const router = {
    'sample': handlers.sample
}