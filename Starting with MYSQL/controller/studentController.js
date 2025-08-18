const db = require("../utils/db_connection");
const { Student, Post } = require("../models/index");

exports.addStudent = async (req, res) => {
  console.log("Add student controller called");

  try {
    const { name, email, age } = req.body;
    const student = await Student.create({ name, email, age });
    res.status(201).send(student);
  } catch (error) {
    console.log(error);
  }

  // const query = `insert into students (name,email,age) values (?,?,?)`;
  //
  // db.execute(query, [name, email, age], (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     db.end();
  //     return res.send(err);
  //   } else if (result.affectedRows == 0) {
  //     console.log("Something went wrong");
  //     return res.send("Something wrong at the backend");
  //   }
  // });
};

exports.getAllStudents = async (req, res) => {
  console.log("get all students controller called");

  try {
    const students = await Student.findAll();
    if (!students) {
      return res.send("No students found");
    }
    res.send(students);
  } catch (error) {
    console.log(error);
  }

  // const query = `select * from students`;

  // db.execute(query, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     db.end();
  //     return res.send(err);
  //   }
  //   res.send(result);
  // });
};

exports.getStudentById = async (req, res) => {
  console.log("get student by id controller called");

  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.send("No record found");
    }
    res.send(student);
  } catch (error) {
    console.log(error);
  }

  // const query = `select * from students where id=?`;

  // db.execute(query, [id], (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     db.end();
  //     return res.send(err);
  //   } else if (result.affectedRows == 0) {
  //     console.log("Something went wrong");
  //     return res.send("Something went wrong");
  //   }
  //   res.send(result);
  // });
};

exports.updateStudentById = async (req, res) => {
  console.log("update student controller called");

  try {
    const { name, email, age } = req.body;
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).send("User not found");
    }
    student.name = name ? name : student.name;
    student.email = email ? email : student.email;
    student.age = age ? age : student.age;
    await student.save();
    res.send(student);
  } catch (error) {
    console.log(error);
  }

  // const query = `update students set name=?, email=?, age=? where id=?  `;

  // db.execute(query, [name, email, age, id], (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     db.end();
  //     return res.send(err);
  //   } else if (result.affectedRows == 0) {
  //     console.log("Something went wrong");
  //     return res.send("Something wrong at the backend");
  //   }
  //   res.send("Updated");
  // });
};

exports.deleteStudentById = async (req, res) => {
  console.log("delete student controller called");

  try {
    const { id } = req.params;
    const student = await Student.destroy({ where: { id } });
    if (!student) {
      return res.status(404).send("Not found");
    }
    res.send("Deleted");
  } catch (error) {
    console.log(error);
  }

  // const query = `delete from students where id=?`;

  // db.execute(query, [id], (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     db.end();
  //     res.send(err);
  //   } else if (result.affectedRows == 0) {
  //     console.log("Something went wrong");
  //     res.send("Something wrong at the backend");
  //   }
  //   res.send("Deleted");
  // });
};

exports.getAllPostsByStudentId = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findAll({ where: { studentId: id } });
    if (!posts) {
      return res.json({ success: true, message: "No Posts Found" });
    }
    res.json({ success: true, message: posts });
  } catch (error) {
    console.log(error);
  }
};

exports.addPost = async (req, res) => {
  try {
    const { name, email, age, message } = req.body;
    const student = await Student.create({ name, email, age });
    const post = await Post.create({ message, studentId: student.id });
    res.json({student,post});
  } catch (error) {
    console.log(error);
  }
};
