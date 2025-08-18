const { Courses, Student } = require("../models/index");

exports.addCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const course = await Courses.create({ name });
    res.json(course);
  } catch (error) {
    console.log(error);
  }
};

exports.addStudentToCourse = async (req, res) => {
  try {
    console.log("here");
    const { studentId, courseId } = req.body;
    const student = await Student.findByPk(studentId);
    const courses = await Courses.findAll({ where: { id: courseId } });
    await student.addCourses(courses);

    const updatedCourse = await Student.findByPk(studentId, {
      include: Courses,
    });

    res.json(updatedCourse);
  } catch (error) {
    console.log(error);
  }
};
