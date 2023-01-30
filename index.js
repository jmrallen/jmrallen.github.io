// Get the welcome header element
var welcome = document.getElementById("h1");

// Set the initial position of the header to be off-screen to the left
welcome.style.left = "-10%";

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

// Get the form element
var form = document.getElementById("contact-form");

// Add an event listener to the form to listen for the submit event
form.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the form from submitting

  // Get the input elements
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Check if the name field is filled
  if (name === "") {
    alert("Please enter your name");
    return;
  }

  // Check if the email field is filled
  if (email === "") {
    alert("Please enter your email");
    return;
  }

  // Check if the message field is filled
  if (message === "") {
    alert("Please enter a message");
    return;
  }

  // All fields are filled, show a success message
  alert("Thank you for your message, " + name + "! We will be in touch soon.");
});
