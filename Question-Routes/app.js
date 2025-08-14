const app = require("express")();

app.use((req, res, next) => {
  req.user = { value: "Guest" };
  next();
});

app.get("/orders", (req, res, next) => {
    res.send(`<h1>"Here is the list of all orders.</h1>`);
});
app.post("/orders", (req, res, next) => {
    res.send(`<h1>A new order has been created.</h1>`);
});

app.get("/users", (req, res, next) => {
    res.send(`<h1>Here is the list of all users.</h1>`);
});
app.post("/users", (req, res, next) => {
    res.send(`<h1>A new user has been added.</h1>`);
});



app.listen(3000, (req, res) => {
  console.log(
    "Server is up and running on port 3000! Ready to handle requests."
  );
});
