const db = require("../utils/db_connection");

exports.addStudent = (req, res) => {
  console.log("Add student controller called");
  const { name, email } = req.body;

  const query = `insert into students (name,email) values (?,?)`;

  db.execute(query, [name, email], (err, result) => {
    if (err) {
      console.log(err);
      db.end();
      res.send(err);
    } else if (result.affectedRows == 0) {
      console.log("Something went wrong");
      res.send("Something wrong at the backend");
    }
    res.send("Entry added");
  });
};

exports.updateStudent = (req, res) => {
  console.log("update student controller called");
  const { name, email } = req.body;
  const { id } = req.params;

  const query = `update students set name=?, email=? where id=?  `;

  db.execute(query, [name, email, id], (err, result) => {
    if (err) {
      console.log(err);
      db.end();
      res.send(err);
    } else if (result.affectedRows == 0) {
      console.log("Something went wrong");
      res.send("Something wrong at the backend");
    }
    res.send("Updated");
  });
};

exports.deleteStudent = (req, res) => {
  console.log("delete student controller called");
  const { id } = req.params;

  const query = `delete from students where id=?`;

  db.execute(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      db.end();
      res.send(err);
    } else if (result.affectedRows == 0) {
      console.log("Something went wrong");
      res.send("Something wrong at the backend");
    }
    res.send("Deleted");
  });
};
