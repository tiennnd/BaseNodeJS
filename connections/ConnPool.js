const mysql = require('mysql');

const config = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'dulich'
}

var pool = mysql.createPool(config)
module.exports = pool
