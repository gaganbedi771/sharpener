const app = require("express")();

app.use((req, res, next) => {
  req.user = { value: "Guest" };
  next();
});

app.get("/welcome", (req, res, next) => {
    res.send(`<h1>Welcome, ${req.user.value}!</h1>`);
});

app.listen(3000, (req, res) => {
  console.log(
    "Server is up and running on port 3000! Ready to handle requests."
  );
});
