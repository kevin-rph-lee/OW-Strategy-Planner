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
      data: {email: email.toLowerCase(), password: password},
      method: 'POST'
    }).done((id) => {
      window.location.replace(`/`);
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


  $('.login-submit').click(function(e){
    const email = $('#login-email').val();
    const password = $('#login-password').val();

    $.ajax({
      url: '/users/login',
      data: {email: email.toLowerCase(), password: password},
      method: 'POST'
    }).done((id) => {
      window.location.replace(`/`);
    }).catch((err) => {
      $('.login-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong> Your password or username is incorrect
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
    });

  });

  $("#logout-button").on('click', function (event) {
    event.preventDefault();
    console.log('attempting post');
    $.ajax({
      type: "POST",
      url: "/users/logout",
      success: function (result) {
          location.href="/";
      }
    })
  })



  // Get the modal
  const newPlanModal = document.getElementById('new-plan-modal');

  // Get the button that opens the modal
  const newPlanButton = document.getElementById("new-plan-button");



  // Get the modal
  const registerModal = document.getElementById('register-modal');

  // Get the button that opens the modal
  const registerButton = document.getElementById("register-button");

  // Get the modal
  const loginModal = document.getElementById('login-modal');

  // Get the button that opens the modal
  const loginButton = document.getElementById("login-button");

  // Get the <span> element that closes the modal
  const closeButton = document.getElementsByClassName("close-button");

  const newMarkerModal = document.getElementById('new-marker-modal');

  // When the user clicks on the button, open the modal
  registerButton.onclick = function() {
      registerModal.style.display = "block";
  }

  // When the user clicks on the button, open the modal
  newPlanButton.onclick = function() {
      newPlanModal.style.display = "block";
  }


  // When the user clicks on the button, open the modal
  loginButton.onclick = function() {
      loginModal.style.display = "block";
  }


  // When the user clicks on <span> (x), close the modal
  closeButton.onclick = function() {
      console.log('Close')
      registerModal.style.display = "none";
      loginModal.style.display = "none";
      newPlanModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == registerModal) {
          registerModal.style.display = "none";
      }
      if (event.target == loginModal) {
          loginModal.style.display = "none";
      }
      if (event.target == newMarkerModal) {
          newMarkerModal.style.display = "none";
      }
      if (event.target == newPlanModal) {
          newPlanModal.style.display = "none";
      }
  }







});
