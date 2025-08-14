const app = require("express")();
const productRouter=require("./routes/products");
const categoryRouter=require("./routes/category");


app.use((req, res,next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

app.use("/products",productRouter);
app.use("/categories",categoryRouter);



app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(4000, (req, res) => {
  console.log(
    "Server is up and running on port 4000! Ready to handle requests."
  );
});
