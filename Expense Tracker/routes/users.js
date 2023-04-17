const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");
const premiumControllers = require("../controllers/premium");
const userAuthentication = require("../middleware/authenticate");

router.post("/signup", controllers.signUp);
router.post("/signin", controllers.signIn);
router.get("/checkPremium", userAuthentication, premiumControllers.checkPremium);

module.exports = router;