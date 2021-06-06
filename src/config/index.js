require('dotenv').config();

const config = {
    db: process.env.DB,
    port: process.env.PORT || 8000
}

module.exports = config;