$(() => {
  // Get the modal
  const registerModal = document.getElementById('register-modal');

  // Get the button that opens the modal
  const registerButton = document.getElementById("register-button");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  registerButton.onclick = function() {
      registerModal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      registerModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == registerModal) {
          registerModal.style.display = "none";
      }
  }
});
