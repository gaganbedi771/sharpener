const User = require("./user");
const Expense = require("./expense");
const Payment = require("./payment");
const ForgotPasswordRequest = require("./forgotPasswordRequest");

User.hasMany(Expense, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId", onDelete: "cascade" });

User.hasMany(Payment, { foreignKey: "userId" });
Payment.belongsTo(User, { foreignKey: "userId", onDelete: "cascade" });

User.hasMany(ForgotPasswordRequest, { foreignKey: "userId" });
ForgotPasswordRequest.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "cascade",
});

module.exports = {
  User,
  Expense,
  Payment,
  ForgotPasswordRequest,
};
