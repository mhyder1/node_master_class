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
        
    // ...send the response to client
    res.end('Hello World\n');

    // Log the request path to the server (sent in the body)
    console.log('Request received with this payload: ', buffer);
    })
})


//Start the server, and hav it listen on prot 3000
server.listen(3000, () => {
    console.log('The server is listening on port 3000');
})