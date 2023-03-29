const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

//for DOM loading
router.get("/getAll", controllers.getAll);

module.exports = router;