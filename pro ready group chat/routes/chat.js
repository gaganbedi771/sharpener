const express = require("express");
const router = express.Router();
const chatControl = require("../controllers/chatControl");
const userAuthentication = require("../middleware/authenticate");

router.use("/send-msg",userAuthentication, chatControl.send_msg);
// router.post("/signin",loginControl.signin);

module.exports = router;