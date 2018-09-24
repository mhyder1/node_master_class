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

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get http method
    const method = req.method.toLowerCase();

    // Send the response
    res.end('Hello World\n');

    // Lod the request path
    console.log('Request received on path: '+trimmedPath+' with method: '+ method+' and with these query string parameters:', queryStringObject);
})


//Start the server, and hav it listen on prot 3000
server.listen(3000, () => {
    console.log('The server is listening on port 3000');
})