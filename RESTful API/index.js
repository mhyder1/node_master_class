/*
Primary file for API
*/

//Dependencies
const http = require('http');

//The server should respond to all requests with a string
const server = http.createServer((req, res) => {

    // Send the response
    res.end('Hello World\n');
})

//Start the server, and hav it listen on prot 3000
server.listen(3000, () => {
    console.log('The server is listening on port 3000');
})