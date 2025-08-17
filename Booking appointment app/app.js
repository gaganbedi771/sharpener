const exrpess = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./utils/db_connection");
const Appointment=require("./models/appointment");
const appRouter=require("./routes/appointmentRoute");
const app = exrpess();

app.use(cors());
app.use(exrpess.json());
app.use(exrpess.static("public"));

app.use("/app",appRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("Listing on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
