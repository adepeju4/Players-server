const express = require('express');
// const morgan = require('morgan');
const playerRouter = require('../routes');
const config = require('../config');
const app = express();
const port = config.port || 5000;

app.use(express.json());
app.use(express.static('public'));

// app.use(morgan('dev'));
app.use('/', playerRouter);


const startServer = () => {
    app.listen(port, () => {
        console.log(`Server listening at http://${config.hostname}:${port}`);
    })
}


module.exports = startServer;