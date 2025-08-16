const express = require("express");
const mysql = require("mysql2");
const app = express();

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

  const query = `create table students (
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

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port: 3000");
});
