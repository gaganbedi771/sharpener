const { Sequelize } = require("sequelize");

const db = new Sequelize("bus_booking", "root", "toor", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await db.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.log("DB not connected");
  }
})();

module.exports = db;
