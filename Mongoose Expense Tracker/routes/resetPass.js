const express = require("express");
const router = express.Router();
const controllers = require("../controllers/resetPass");

router.use("/password/forgotpassword",controllers.sendLink);

router.use(`/password/resetpassword/:uuid`,controllers.getLink);

router.use(`/password/updatepassword/:id`,controllers.updatePassword);

module.exports=router;

    