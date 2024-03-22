const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.use(express.static("static"));

const documents = {};

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (documentId) => {
    socket.join(documentId);
    socket.emit("content", documents[documentId] || "");
  });

  socket.on("content", (documentId, content) => {
    socket.broadcast.to(documentId).emit("content", content);
    documents[documentId] = content;
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
