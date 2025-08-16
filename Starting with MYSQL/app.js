const express = require("express");
const db=require("./utils/db_connection");
const studentRoute=require("./routes/studentRoute");

const app = express();
app.use(express.json())

app.use("/student",studentRoute);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port: 3000");
});
