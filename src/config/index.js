require('dotenv').config();

const config = {
    db: process.env.DB,
    port: 8000
}

module.exports = config;