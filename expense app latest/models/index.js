const User = require("./user");
const Expense = require("./expense");
const Payment = require("./payment");

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Payment);
Payment.belongsTo(User);

module.exports = {
  User,
  Expense,
  Payment,
};
