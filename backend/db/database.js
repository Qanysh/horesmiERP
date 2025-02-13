const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

connection.connect(error => {
    if (error) {
        console.log('Database connection failed:', error);
    }
    else {
        console.log('Database ----- OK');
    }
});

module.exports = connection;