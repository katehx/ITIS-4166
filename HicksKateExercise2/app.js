const http = require('http');
const fs = require('fs');

const port = 1234;
const host = 'localhost';
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            res.end();
        }
    });

});

server.listen(port, host, () => {
    console.log('The server is running on port:  ', port);
});