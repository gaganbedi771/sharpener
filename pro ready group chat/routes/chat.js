const express = require("express");
const router = express.Router();
const chatControl = require("../controllers/chatControl");
const userAuthentication = require("../middleware/authenticate");

router.post("/send-msg", userAuthentication, chatControl.send_msg);
router.get("/getAllChats", userAuthentication, chatControl.getAllChats);
router.get("/getUpdate/:lastMsgId", userAuthentication, chatControl.getUpdate);

module.exports = router;