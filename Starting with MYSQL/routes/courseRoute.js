const express = require("express");
const courseController = require("../controller/courseController");
const router = express.Router();

router.post("/", courseController.addCourse);
router.get("/", courseController.addStudentToCourse);

module.exports = router;
