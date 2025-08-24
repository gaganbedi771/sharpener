const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authorization = require("../middleware/auth");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/buyPremium", authorization.auth, userController.buyPremium);
router.get("/updatePremium", userController.updatePremium);
router.get("/isPremium",authorization.auth, userController.isPremium);
router.get("/leaderboard",authorization.auth, userController.leaderboard);
router.get("/forgotPassword/:email", userController.forgotPassword);
router.get("/resetPasswordPage/:uuid", userController.resetPasswordPage);
router.post("/resetPassword/:uuid", userController.resetPassword);

module.exports = router;
