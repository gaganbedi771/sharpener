const express = require("express");
const db = require("./utils/db_connection");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/buses", busRoutes);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Bus booking system working on port: 3000");
});
