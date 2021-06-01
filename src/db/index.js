const config = require('../config');
const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    password: process.env.dbPassword,
    database: 'player-server',
    host: 'localhost',
    port: 5432
})

pool.connect()
    .then(() => console.log('connected to database successfully'));



module.exports = pool