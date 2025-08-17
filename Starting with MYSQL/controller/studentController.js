const db = require("../utils/db_connection");

exports.addStudent = (req, res) => {
  console.log("Add student controller called");
  const { name, email, age } = req.body;

  const query = `insert into students (name,email,age) values (?,?,?)`;

  db.execute(query, [name, email, age], (err, result) => {
    if (err) {
      console.log(err);
      db.end();
      return res.send(err);
    } else if (result.affectedRows == 0) {
      console.log("Something went wrong");
      return res.send("Something wrong at the backend");
    }
    res.send("Entry added");
  });
};

exports.getAllStudents = (req, res) => {
  console.log("get all students controller called");

  const query = `select * from students`;

  db.execute(query, (err, result) => {
    if (err) {
      console.log(err);
      db.end();
      return res.send(err);
    }
    res.send(result);
  });
};

exports.getStudentById = (req, res) => {
  console.log("get student by id controller called");

  const { id } = req.params;

  const query = `select * from students where id=?`;

  db.execute(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      db.end();
      return res.send(err);
    } else if (result.affectedRows == 0) {
      console.log("Something went wrong");
      return res.send("Something went wrong");
    }
    res.send(result);
  });
};

exports.updateStudentById = (req, res) => {
  console.log("update student controller called");
  const { name, email, age } = req.body;
  const { id } = req.params;

  const query = `update students set name=?, email=?, age=? where id=?  `;

  db.execute(query, [name, email, age, id], (err, result) => {
    if (err) {
      console.log(err);
      db.end();
      return res.send(err);
    } else if (result.affectedRows == 0) {
      console.log("Something went wrong");
      return res.send("Something wrong at the backend");
    }
    res.send("Updated");
  });
};

exports.deleteStudentById = (req, res) => {
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
