const { Sequelize } = require("sequelize");

const db = new Sequelize("booking_appointment", "root", "toor", {
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
