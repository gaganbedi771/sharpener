const express = require("express");
const groupController = require("../controllers/groupController");
const { authenticate } = require("../middlewares/authenticate");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.get("/message", authenticate, groupController.getMessages);
router.post("/message", authenticate,upload.single("file"), groupController.sendMessage);

router.get("/", authenticate, groupController.getGroupsByUserId);
router.get("/members",authenticate,groupController.getGroupMembers);
router.get("/:name",authenticate,groupController.getGroupByName);

router.post("/", authenticate, groupController.createGroup);
router.post("/join", authenticate, groupController.joinGroupByName);



module.exports = router;
