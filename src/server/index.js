const http = require('http');
const express = require('express');
const morgan = require('morgan');
const config = require('../config')
const port = config.port;
const playerRoute = require('../routes');


const app = express();
app.use(morgan('dev'));
app.use(express.json());


app.use(express.static('public'));

app.use('/players', playerRoute);

const server = http.createServer(app);

const startServer = () => {
    server.listen(port, () => {
        console.log(`Server running at ${port}`);
    });
}

module.exports = startServer