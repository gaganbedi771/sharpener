const { Sequelize } = require("sequelize");
const db = new Sequelize("expense-tracker", "root", "toor", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await db.authenticate();
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
})();

module.exports = db;
