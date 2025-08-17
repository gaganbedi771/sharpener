const express = require("express");
const db = require("./utils/db_connection");
const studentRoute = require("./routes/studentRoute");
const student = require("./models/students");

const app = express();
app.use(express.json());

app.use("/student", studentRoute);

db.sync({ force: true })
  .then(() => {
    app.listen(3000, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Server is running on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
