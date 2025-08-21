const { Expense } = require("../models/index");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await req.user.getExpenses();
    res.json(expenses);
  } catch (error) {
    console.log(error);
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await req.user.getExpenses({ where: { id } });
    if (!expense) {
      res.json("Something went wrong");
    }
    res.json(expense);
  } catch (error) {
    console.log(error);
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    const expense = await req.user.createExpense({
      description,
      amount,
      category,
    });
    res.json(expense);
  } catch (error) {
    console.log(error);
  }
};

exports.editExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category } = req.body;
    let expense = await req.user.getExpenses({ where: { id } });
    expense=expense[0];
    expense.description = description ? description : expense.description;
    expense.amount = amount ? amount : expense.amount;
    expense.category = category ? category : expense.category;
    await expense.save();
    res.json(expense);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await req.user.getExpenses({ where: { id } });
    await req.user.removeExpense(expense);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
