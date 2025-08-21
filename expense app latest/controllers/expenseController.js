const { Expense } = require("../models/index");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.log(error);
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
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

    const expense = await Expense.create({ description, amount, category });
    res.json(expense);
  } catch (error) {
    console.log(error);
  }
};

exports.editExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category } = req.body;
    const expense = await Expense.findByPk(id);
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
    await Expense.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
