const http = require('http');
const express = require('express');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;
const playerRoute = require('../routes')

const app = express();
app.use(morgan('dev'));
app.use(express.json());


app.use(express.static(__dirname + '/public'));

app.use('/', playerRoute);

const server = http.createServer(app);

const startServer = () => {
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
}

module.exports = startServer