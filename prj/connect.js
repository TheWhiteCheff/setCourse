const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'mydb',
  port: process.env.DB_PORT || '3306',
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
