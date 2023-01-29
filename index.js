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
