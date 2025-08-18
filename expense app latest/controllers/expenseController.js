const Expense = require("../models/expense");

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
    const { name, amount } = req.body;

    const expense = await Expense.create({ name, amount });
    res.json(expense);
  } catch (error) {
    console.log(error);
  }
};

exports.editExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount } = req.body;
    const expense = await Expense.findByPk(id);
    expense.name = name ? name : expense.name;
    expense.amount = amount ? amount : expense.amount;
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
