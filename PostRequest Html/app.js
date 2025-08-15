const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

app.use(express.static("public"));
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.use("/", (req, res, next) => {
  res.send("<h1>Welcome to the Ecommerce startup!</h1>");
});

app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(4000, (req, res) => {
  console.log(
    "Server is up and running on port 4000! Ready to handle requests."
  );
});
