const app = require("express")();
const studentsRouter = require("./routes/students");
const coursesRouter = require("./routes/courses");

app.use("/students", studentsRouter);
app.use("/courses", coursesRouter);
app.use("/", (req, res, next) => {
  res.send("<h1>Welcome to the Student & Course Portal API!</h1>");
});

app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(4000, (req, res) => {
  console.log(
    "Server is up and running on port 4000! Ready to handle requests."
  );
});
