const express = require("express");
const path = require("path");
const db = require("./utils/db_connection");
require("./models/index");
const expenseRoute = require("./routes/expenseRoute");
const userRoute = require("./routes/userRoute");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});

app.use("/expense", expenseRoute);
app.use("/user", userRoute);

(async () => {
  try {
    await db.sync({ force: true });
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
})();
