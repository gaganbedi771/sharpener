const express = require("express");
const studentController = require("../controller/studentController");
const router = express.Router();

router.post("/", studentController.addStudent);
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudentById);
router.delete("/:id", studentController.deleteStudentById);

module.exports = router;
