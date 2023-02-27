// Import the Express and Socket.io libraries
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Set the public directory as a static directory for serving files
app.use(express.static("public"));

// Listen for client connections
io.on("connection", (socket) => {
  console.log(`User with ID: ${socket.id} connected`);

  // Listen for updates to the object's coordinates
  socket.on("updateCoordinates", (data) => {
    // Broadcast the new coordinates to all connected clients except the sender
    socket.broadcast.emit("updateCoordinates", data);
  });

  // Listen for client disconnections
  socket.on("disconnect", () => {
    console.log(`User with ID: ${socket.id} disconnected`);
  });
});

// Start the server and listen on port 3000
http.listen(3000, () => {
  console.log("listening on port:3000");
});
