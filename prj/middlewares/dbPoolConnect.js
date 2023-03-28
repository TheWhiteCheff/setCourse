const mysql = require('mysql2');
const util = require('util');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

pool.query = util.promisify(pool.query);

// (async () => {
//     console.log(pool.query);
//     try {
//         const result = await pool.query('select * from user')
//         console.log(result);
//     } catch (e) {
//         console.log(e);
//     }
// })();

module.exports = (req, res, next) => {
    req.db = pool;
    return next();
}