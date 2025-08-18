const Student = require("../models/students");
const Post = require("../models/posts");
const Courses = require("../models/courses");
const StudentCourses = require("../models/studentCourses");

Student.hasMany(Post);
Post.belongsTo(Student);

Student.belongsToMany(Courses, { through: StudentCourses });
Courses.belongsToMany(Student, { through: StudentCourses });

module.exports = {
  Student,
  Post,
  Courses,
  StudentCourses
};
