const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "root", "toor", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database established");
  } catch (error) {
    console.log(err);
  }
})();

module.exports = sequelize;

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "toor",
//   database: "test",
// });

// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Database connected");

//   const query = `create table if not exists students (
//         id int auto_increment primary key,
//         name varchar(30),
//         email varchar(50) unique,
//         age int
//         )`;

//   connection.execute(query, (err) => {
//     if (err) {
//       console.log(err);
//       connection.end();
//       return;
//     }
//   });
// });

// module.exports = connection;
