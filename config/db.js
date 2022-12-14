const mysql = require('mysql2');
const config = require('../config/constant.json');

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
    database: config.DB_DATABASE,
});

pool.getConnection((err) => {
    if (err) {
        console.log('Error while connecting to DB', err.stack);
        process.exit(1);
    }
    console.log("Connected to DB");
});

const executeQuery = (query, arrayParams) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arrayParams, (error, data) => {
                if (error) {
                    console.log("error occured in query");
                    reject(error);
                }
                console.log(data);
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = { executeQuery }