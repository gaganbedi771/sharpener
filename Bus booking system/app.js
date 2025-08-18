const express = require("express");
const db = require("./utils/db_connection");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");

const {User,Bus,Booking,Payment}=require("./models");

const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/bus", busRoutes);

db.sync({ force: false })
  .then(() => {
    app.listen(3000, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Bus booking system working on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
