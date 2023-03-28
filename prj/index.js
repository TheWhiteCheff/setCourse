require("dotenv").config();
const config = require('config');

const express = require('express');

const mysql = require('mysql2/promise');
const util = require('util');

const { Sequelize } = require('sequelize');
const db = require('./middlewares/dbPoolConnect');
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const host = process.env.HOST;
const port = process.env.PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/users', usersRouter);

app.listen(port, host, () => {
    console.log(`App is running on port ${port}`);
})

// initialize();

async function initialize() {
    const { host, port, user, password } = config.get("mysql");
    const connection = await mysql.createConnection({ host, user, password });

    if (connection) {
        console.log("logged on DB port: " + port);
    }

    connection.connect = util.promisify(connection.connect);
    // connection.query = util.promisify(connection.query);

    await connection.query("USE mydb;")
    await connection.query("CREATE TABLE if not exists users (id int auto_increment, username varchar(255) not null, primary key (id))");
    await connection.query("CREATE TABLE if not exists users_symbols (id int auto_increment, user_id int not null, symbol varchar(3) not null, primary key (id))")
    const res = await connection.query("SHOW FULL TABLES;")
    // console.log(res);
}

