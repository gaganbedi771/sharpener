const express = require("express");
const router = express.Router();
const chatControl = require("../controllers/chatControl");
const userAuthentication = require("../middleware/authenticate");

router.post("/send-msg", userAuthentication, chatControl.send_msg);
router.get("/getChat", userAuthentication, chatControl.getChat);

module.exports = router;