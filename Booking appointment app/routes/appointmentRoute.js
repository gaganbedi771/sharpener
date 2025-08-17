const express = require("express");
const appointmentController = require("../controller/appointmentController");
const router = express.Router();

router.post("/", appointmentController.add);
router.get("/", appointmentController.getAll);
router.get("/:id", appointmentController.getOne);
router.delete("/:id", appointmentController.delete);
router.patch("/:id", appointmentController.edit);

module.exports = router;
