const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");
const userAuthentication=require("../middleware/authenticate");

//for DOM loading
router.get("/getAll", userAuthentication, controllers.getAll);

//adding data to db
router.post("/add-expense",userAuthentication, controllers.addExpense);

//edit data
router.get("/getDetail/:id",userAuthentication, controllers.getDetail); //for prefilling the form
router.patch("/updateDetails/:id",userAuthentication, controllers.updateDetails);

//delete data
router.delete("/deleteExpense/:id",userAuthentication, controllers.deleteExpense);

module.exports = router;