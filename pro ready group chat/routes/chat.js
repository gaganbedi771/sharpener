const express = require("express");
const router = express.Router();
const chatControl = require("../controllers/chatControl");
const userAuthentication = require("../middleware/authenticate");

const multer = require("multer");
const handleMultiparts = multer();

router.post("/send-msg", userAuthentication, chatControl.send_msg);
router.get("/getAllChats", userAuthentication, chatControl.getAllChats);
router.get("/getUpdate/:lastMsgId", userAuthentication, chatControl.getUpdate);
router.post("/createGroup", userAuthentication, chatControl.createGroup);
router.get("/getAllGroups", userAuthentication, chatControl.getAllGroups);
router.post("/addmember", userAuthentication, chatControl.addmember);
router.get("/viewAllMembers", userAuthentication, chatControl.viewAllMembers);
router.get("/addAdmin/:userid", userAuthentication, chatControl.addAdmin);
router.get("/removeMember/:userid", userAuthentication, chatControl.removeMember);
router.post("/sendfile", handleMultiparts.single("myfile"), userAuthentication, chatControl.sendFile);

module.exports = router;