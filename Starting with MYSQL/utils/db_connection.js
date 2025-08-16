const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "test",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Database connected");

  const query = `create table if not exists students (
        id int auto_increment primary key,
        name varchar(20),
        email varchar(20)
        )`;

  connection.execute(query, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
  });
});

module.exports = connection;
