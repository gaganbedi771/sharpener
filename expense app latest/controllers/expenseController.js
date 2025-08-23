const { Expense, User } = require("../models/index");

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
    const user = await User.findByPk(req.user.id);
    user.totalExpense = user.totalExpense + Number(amount);
    await user.save();

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
    expense = expense[0];
    const expenseBefore = expense.amount;

    expense.description = description ? description : expense.description;
    expense.amount = amount ? amount : expense.amount;
    expense.category = category ? category : expense.category;
    await expense.save();

    const user = await User.findByPk(req.user.id);
    user.totalExpense = user.totalExpense - expenseBefore + Number(amount);
    await user.save();
    res.json(expense);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await req.user.getExpenses({ where: { id } });
    const expenseAmountToDelete = expense[0].amount;

    await req.user.removeExpense(expense);

    const user = await User.findByPk(req.user.id);
    user.totalExpense = user.totalExpense - expenseAmountToDelete;
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
