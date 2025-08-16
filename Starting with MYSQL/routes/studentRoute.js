const express = require("express");
const studentController = require("../controller/studentController");
const router = express.Router();

router.post("/add", studentController.addStudent);
router.put("/update/:id", studentController.updateStudent);
router.delete("/delete/:id", studentController.deleteStudent);

module.exports = router;
