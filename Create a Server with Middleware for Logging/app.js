const app = require("express")();

app.use((req, res,next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

app.get("/products", (req, res, next) => {
  res.send(`<h1>Here is the list of all products .</h1>`);
});
app.post("/products", (req, res, next) => {
  res.send(`<h1>A new product has been added.</h1>`);
});

app.get("/categories", (req, res, next) => {
  res.send(`<h1>Here is the list of all categories.</h1>`);
});
app.post("/categories", (req, res, next) => {
  res.send(`<h1>A new categories has been created.</h1>`);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(4000, (req, res) => {
  console.log(
    "Server is up and running on port 4000! Ready to handle requests."
  );
});
