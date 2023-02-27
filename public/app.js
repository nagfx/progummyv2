// Get a reference to the object element
var object = document.getElementById("object");

// Flag to track whether the object is currently being dragged
var isDragging = false;

// Event listener for when the mouse button is pressed down on the object
object.addEventListener("mousedown", function (e) {
  isDragging = true;
});

// Event listener for when the mouse button is released anywhere on the page
document.addEventListener("mouseup", function (e) {
  isDragging = false;
});

// Event listener for when the mouse is moved anywhere on the page
document.addEventListener("mousemove", function (e) {
  // If the object is being dragged
  if (isDragging) {
    // Update the CSS properties of the object to move it to the new position
    object.style.left = e.clientX + "px";
    object.style.top = e.clientY + "px";

    // Send the new coordinates to the server
    socket.emit("updateCoordinates", {
      x: e.clientX,
      y: e.clientY,
    });
  }
});

// Connect to the server using Socket.io
var socket = io();

// Event listener for when the server broadcasts updated coordinates to all clients
socket.on("updateCoordinates", function (data) {
  // Update the CSS properties of the object to move it to the new position
  object.style.left = data.x + "px";
  object.style.top = data.y + "px";
});

// Disable the default drag and drop behavior of the star element
object.ondragstart = function () {
  return false;
};
