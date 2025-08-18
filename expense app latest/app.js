const express = require("express");
const path = require("path");
const db = require("./utils/db_connection");
const Expense = require("./models/expense");
const expenseRoute = require("./routes/expenseRoute");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/expense", expenseRoute);

(async () => {
  try {
    await db.sync({ force: false });
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
})();
