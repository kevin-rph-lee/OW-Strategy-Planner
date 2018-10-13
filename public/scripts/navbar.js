$(() => {

  //Submitting a new user registration
  $('.register-submit').click(function(e){
    e.preventDefault()
    const username = $('#register-username').val();
    const password = $('#password1').val();
    const passwordConfirm = $('#password2').val();

    //Checking if the passwords match
    if (password !== passwordConfirm) {
      $('.register-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong> Your passwords don't match, please try again.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
      return;
    }
    //CHecking for min password length
    if (password.length <= 4 ) {
      $('.register-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong> Your password must have at least 4 characters!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
      return;
    }

    $.ajax({
      url: '/users/new',
      data: {username: username.toLowerCase(), password: password},
      method: 'POST'
    }).done((id) => {
      window.location.replace(`/`);
    }).catch((err) => {
      $('.register-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong> ${err.responseText}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
    });
  });

  //Submit a new login request
  $('.login-submit').click(function(e){
    e.preventDefault();
    const username = $('#login-username').val();
    const password = $('#login-password').val();

    $.ajax({
      url: '/users/login',
      data: {username: username.toLowerCase(), password: password},
      method: 'POST'
    }).done((id) => {
      window.location.replace(`/`);
    }).catch((err) => {
      $('.login-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong>  ${err.responseText}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
    });

  });

  //Logging out button
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

  //Used within new plan modal. Populates map type drop down
  $('#control[type="radio"]').click(function(){
    $.ajax({
      url: '/maps/control',
      method: 'GET'
    }).done((mapTypes) => {
      console.log(mapTypes);
      $("#map-type-select").children().remove();
      for (var i = 0; i < mapTypes.length; i ++) {
        $('#map-type-select').append(`<option data-id= ${mapTypes[i].id}>${mapTypes[i].name}</option>`)
      }
    }).catch((err) => {
      console.log('error!')
    });
  });

  //Used within new plan modal. Populates map type drop down
  $('#escort[type="radio"]').click(function(){
    $.ajax({
      url: '/maps/escort',
      method: 'GET'
    }).done((mapTypes) => {
      console.log(mapTypes);
      $("#map-type-select").children().remove();
      for (var i = 0; i < mapTypes.length; i ++) {
        $('#map-type-select').append(`<option data-id= ${mapTypes[i].id}>${mapTypes[i].name}</option>`)
      }
    }).catch((err) => {
      console.log('error!')
    });
  });

  //Used within new plan modal. Populates map type drop down
  $('#hybrid[type="radio"]').click(function(){
    $.ajax({
      url: '/maps/hybrid',
      method: 'GET'
    }).done((mapTypes) => {
      console.log(mapTypes);
      $("#map-type-select").children().remove();
      for (var i = 0; i < mapTypes.length; i ++) {
        $('#map-type-select').append(`<option data-id= ${mapTypes[i].id}>${mapTypes[i].name}</option>`)
      }
    }).catch((err) => {
      console.log('error!')
    });
  });

  //Used within new plan modal. Populates map type drop down
  $('#assault[type="radio"]').click(function(){
    $.ajax({
      url: '/maps/assault',
      method: 'GET'
    }).done((mapTypes) => {
      console.log(mapTypes);
      $("#map-type-select").children().remove();
      for (var i = 0; i < mapTypes.length; i ++) {
        $('#map-type-select').append(`<option data-id= ${mapTypes[i].id}>${mapTypes[i].name}</option>`)
      }
    }).catch((err) => {
      console.log('error!')
    });
  });

  //Submitting a new plan
  $('#new-plan-form').submit(function (e) {
    e.preventDefault();

    //Checking to see if all form inputs have been filed out (except image)
    if ( $('#plan-name').val().length === 0 || $('#plan-description').val().length === 0 || $('#map-type-select').find(':selected').data('id') === undefined) {
      $('#new-plan-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong> Missing plan name or map
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
      return;
    }

    $.ajax({
      url: '/plans/new',
      data: {
        planName: $('#plan-name').val(),
        planDescription: $('#plan-description').val(),
        mapTypeID: $('#map-type-select').find(':selected').data('id')
      },
      method: 'POST'
    }).done((id) => {
      location.reload()
    }).catch((err) => {
      alert('Some kind of error happened!');
    });
  });

  const newMarkerModal = document.getElementById('new-marker-modal');


  if($('#register-button').length !== 0){
    // When the user clicks on the button, open the modal
    $('#register-button').click(function() {
        $('#register-modal').css('display', 'block');
    });
  }

  if($('#new-plan-button').length !== 0){
    // When the user clicks on the button, open the modal
    $('#new-plan-button').click(function() {
        $('#new-plan-modal').css('display', 'block');
    });
  }

  if($('#login-button').length !== 0){
    // When the user clicks on the button, open the modal
    $('#login-button').click(function() {
        $('#login-modal').css('display', 'block');
    });
  }

  // When the user clicks on <span> (x), close the modal
  $('.close-button').click(function() {
    $('#login-modal').css('display', 'none');
    $('#new-plan-modal').css('display', 'none');
    $('#register-modal').css('display', 'none');
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target.id === 'register-modal') {
      $('#register-modal').css('display', 'none');
    }
    if (event.target.id === 'login-modal') {
      $('#login-modal').css('display', 'none');
    }
    if (event.target.id === 'new-marker-modal') {
      $('#new-marker-modal').css('display', 'none');
    }
    if (event.target.id === 'new-plan-modal') {
      $('#new-plan-modal').css('display', 'none');
    }
  }

});
