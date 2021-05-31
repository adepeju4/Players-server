const config = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connection.on('connected', () => {
    console.log('Db connected!')
})

mongoose.connection.on('disconnected', (err) => {
    console.warn(`Db disconnected because of ${err}`)
})

mongoose.connection.on('error', (err) => {
    console.error(`Could not connect to the database of ${err}`);
    process.exit(-1);
})

const startDb = () => {
    mongoose.connect(config.db, {
        keepAlive: 1,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
}

module.exports = startDb