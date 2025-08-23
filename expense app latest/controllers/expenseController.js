const { Expense, User } = require("../models/index");
const db = require("../utils/db_connection");

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
    const t = await db.transaction();

    const expense = await req.user.createExpense(
      {
        description,
        amount,
        category,
      },
      { transaction: t }
    );
    const user = await User.findByPk(req.user.id, { transaction: t });
    user.totalExpense = user.totalExpense + Number(amount);
    await user.save({ transaction: t });
    await t.commit();
    res.json(expense);
  } catch (error) {
    console.log(error);
    await t.rollback();
  }
};

exports.editExpenseById = async (req, res) => {
  try {
    const t = await db.transaction();
    const { id } = req.params;
    const { description, amount, category } = req.body;
    let expense = await req.user.getExpenses({ where: { id }, transaction: t });
    expense = expense[0];
    const expenseBefore = expense.amount;

    expense.description = description ? description : expense.description;
    expense.amount = amount ? amount : expense.amount;
    expense.category = category ? category : expense.category;
    await expense.save({ transaction: t });
    const expenseAfter = Number(expense.amount);
    const user = await User.findByPk(req.user.id, { transaction: t });
    user.totalExpense = user.totalExpense - expenseBefore + expenseAfter;
    await user.save({ transaction: t });
    await t.commit();
    res.json(expense);
  } catch (error) {
    await t.rollback();
    console.log(error);
  }
};

exports.deleteExpenseById = async (req, res) => {
  try {
    const t = await db.transaction();
    const { id } = req.params;
    let expense = await req.user.getExpenses({ where: { id }, transaction: t });
    expense = expense[0];
    const expenseAmountToDelete = expense.amount;

    await req.user.removeExpense(expense, { transaction: t });
    await expense.destroy({ transaction: t });

    const user = await User.findByPk(req.user.id, { transaction: t });
    user.totalExpense = user.totalExpense - expenseAmountToDelete;
    await user.save({ transaction: t });
    await t.commit();
    res.sendStatus(200);
  } catch (error) {
    await t.rollback();
    console.log(error);
  }
};
