const express = require("express");
const router = express.Router();
const chatControl = require("../controllers/chatControl");
const userAuthentication = require("../middleware/authenticate");

router.get("/getPublicToken", userAuthentication, chatControl.getGroupToken);
router.get("/getGroupToken/:groupId", userAuthentication, chatControl.getGroupToken);

module.exports = router;