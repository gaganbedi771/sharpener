const express = require("express");
const router = express.Router();
const controllers = require("../controllers/premium");
const userAuthentication = require("../middleware/authenticate");

router.get("/purchasePremium", userAuthentication, controllers.buyPremium);
router.patch("/purchasePremium/success", userAuthentication, controllers.updatePremium);
router.patch("/purchasePremium/failure", userAuthentication, controllers.updateFailure);
router.get("/purchasePremium/showLeaderBoard", userAuthentication, controllers.showLeaderBoard);
router.get("/download", userAuthentication, controllers.sendDownloadLink);

module.exports = router;