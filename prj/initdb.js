const mysql = require('mysql2');
const config = require('config');
const util = require('util');

(async () => {
  console.log(__dirname)

    const connection = mysql.createConnection({
        host: config.get('mysql.host'),
        user: config.get('mysql.user'),
        password: config.get('mysql.password'),
        database: config.get('mysql.database'),
    })

    connection.connect = util.promisify(connection.connect);
    connection.query = util.promisify(connection.query);

    await connection.connect();

    console.log('connected');

    await connection.query(`DROP TABLE users`);
    await connection.query(`DROP TABLE users_symbols`);

    await connection.query(`
    CREATE TABLE users (
        id int auto_increment,
        user_id varchar(255) not null,
        primary key (id)
      )  
 
    `);

    console.log('created usres table')

    await connection.query(`
    CREATE TABLE users_symbols (
        id int auto_increment,
        user_id int not null,
        symbol varchar(3) not null,
        primary key (id)
      )  
     `);

    console.log('created users_symbols'); 

})();