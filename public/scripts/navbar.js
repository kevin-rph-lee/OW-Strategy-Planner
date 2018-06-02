$(() => {


  $('.register-submit').click(function(e){
    const email = $('#register-email').val();
    const password = $('#password1').val();
    const passwordConfirm = $('#password2').val();

    if(password !== passwordConfirm){
      $('.register-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong> Your passwords don't match, please try again.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
    }


    $.ajax({
      url: '/users/new',
      data: {email: email, password: password},
      method: 'POST'
    }).done((id) => {
      console.log('ID: ', id);
    }).catch((err) => {
      // $('.register-alert').append(`
      // <div class="alert alert-warning alert-dismissible fade show" role="alert">
      // <strong>OOPS!</strong> ${err.responseText}
      // <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      //   <span aria-hidden="true">&times;</span>
      // </button>
      // </div>
      // `)
    });

  });


  // Get the modal
  const registerModal = document.getElementById('register-modal');

  // Get the button that opens the modal
  const registerButton = document.getElementById("register-button");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close-button")[0];

  // When the user clicks on the button, open the modal
  registerButton.onclick = function() {
      registerModal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      console.log('Close')
      registerModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == registerModal) {
          registerModal.style.display = "none";
      }
  }



});
