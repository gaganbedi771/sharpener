const db = require("../utils/db_connection");

exports.addUser = (req, res) => {
  const { name, email } = req.body;

  const query = `insert into user (name,email) values (?,?)`;

  db.execute(query, [name, email], (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (result.affectedRows == 0) {
      console.log("Something went wrong at server side");
      res.send("Something went wrong at server side");
    }
    res.send("User added");
  });
};

exports.getAllUsers = (req, res) => {
  const query = `select * from user`;

  db.execute(query, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.send(result);
  });
};
