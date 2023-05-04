const express = require("express");
const router = express.Router();
const chatControl = require("../controllers/chatControl");
const userAuthentication = require("../middleware/authenticate");

router.get("/getPublicToken", userAuthentication, chatControl.getPublicToken);
router.get("/getGroupToken/:groupId", userAuthentication, chatControl.getPublicToken);

module.exports = router;