const express = require("express");
const path = require("path");
const db = require("./utils/db_connection");
const Player = require("./models/player");
const playerRoute = require("./routes/playerRoute");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/players", playerRoute);

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
