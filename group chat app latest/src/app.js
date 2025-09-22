const express = require("express");
const path = require("path");

const { userRoutes } = require("./routes/index");
const { PORT } = require("./config/serverConfig");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

//serving static files
app.use((req, res) => {
  let requestedFile = req.path;

  if (requestedFile == "/") {
    requestedFile = "/index.html";
  }

  const filePath = path.join(__dirname, "views", requestedFile);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    }
  });
});

(() => {
  app.listen(PORT, () => {
    console.log("App is listening on port", PORT);
  });
})();
