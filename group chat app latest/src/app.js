const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");
require("./utils/archiveMessagesCron");

const { userRoutes, groupRoutes } = require("./routes/index");
const { PORT } = require("./config/serverConfig");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/group", groupRoutes);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

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

//socket io

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
    console.log(`User ${socket.id} joined group ${groupId}`);
  });

  socket.on("sendMessage", (data) => {
    // data = { groupId, message, senderName, fileUrl }
    console.log("📩 Message received:", data);
    socket.to(data.groupId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

(() => {
  server.listen(PORT, () => {
    console.log("App is listening on port", PORT);
  });
})();
