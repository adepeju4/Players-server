require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    hostname: 'localhost'
}

module.exports = config;