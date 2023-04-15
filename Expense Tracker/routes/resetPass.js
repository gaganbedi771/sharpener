const express = require("express");
const router = express.Router();
const controllers = require("../controllers/resetPass");

router.use("/password/forgotpassword",controllers.resetPass);

module.exports=router;

    