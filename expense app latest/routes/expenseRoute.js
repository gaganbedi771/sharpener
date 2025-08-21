const express = require("express");
const expenseController = require("../controllers/expenseController");
const router = express.Router();
const authorization = require("../middleware/auth");

router.get("/", authorization.auth, expenseController.getAllExpenses);
router.get("/:id",authorization.auth, expenseController.getExpenseById);
router.post("/",authorization.auth, expenseController.addExpense);
router.patch("/:id",authorization.auth, expenseController.editExpenseById);
router.delete("/:id",authorization.auth, expenseController.deleteExpenseById);

module.exports = router;
