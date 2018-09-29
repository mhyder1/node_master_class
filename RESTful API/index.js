/*
Primary file for API
*/

//Dependencies
const http = require('http');
const url = require('url');

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
    
    //Get the headers as an object
    const headers = req.headers;

    // Send the response to client
    res.end('Hello World\n');

    // Log the request path to the server
    console.log('Request received with these headers', headers);
})


//Start the server, and hav it listen on prot 3000
server.listen(3000, () => {
    console.log('The server is listening on port 3000');
})