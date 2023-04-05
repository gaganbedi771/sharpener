const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");
const userAuthentication = require("../middleware/authenticate");

router.post("/signup", controllers.signUp);
router.post("/signin", controllers.signIn);
router.get("/checkPremium", userAuthentication, controllers.checkPremium);

module.exports = router;