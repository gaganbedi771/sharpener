const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");
const userAuthentication=require("../middleware/authenticate");

router.get("/purchasePremium",userAuthentication,controllers.buyPremium);
router.patch("/purchasePremium/success",userAuthentication,controllers.updatePremium);
router.patch("/purchasePremium/failure",userAuthentication,controllers.updateFailure);

module.exports = router;