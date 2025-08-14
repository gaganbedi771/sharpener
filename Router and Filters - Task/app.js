const app = require("express")();
const booksRouter=require("./routes/books");


app.use((req, res,next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

app.use("/books",booksRouter);



app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(4000, (req, res) => {
  console.log(
    "Server is up and running on port 4000! Ready to handle requests."
  );
});
