const express = require("express");
const router = express.Router();
const loginControl = require("../controllers/loginControl");

router.post("/signup", loginControl.signup);
router.post("/signin", loginControl.signin);
router.use("/forgotpassword", loginControl.sendLink);
router.use("/resetpassword/:uuid", loginControl.resetPage);
router.use("/updatepassword/:id", loginControl.updatepassword);

module.exports = router;