window.onload = function() {
// Get the welcome header element
var welcome = document.getElementById("header");

// Set the initial position of the header to be off-screen to the left
welcome.style.left = "-100%";

// Use the setTimeout function to animate the header after 2 seconds
setTimeout(function() {
  // Use the setInterval function to animate the header moving from left to right
  var interval = setInterval(function() {
    // Get the current left position of the header
    var left = parseInt(welcome.style.left);

    // Check if the header has reached the end position
    if (left >= 0) {
      clearInterval(interval); // stop the animation
      return;
    }

    // Update the left position of the header
    welcome.style.left = (left + 10) + "%";
  }, 20);
}, 2000);
};