$(() => {

  console.log('Markers ', markers);

  const markersArray = [];
  const infoWindowArray = [];
  var clickListener;
  var markerClick;
  var infoWindow;

  /**
   * Initializes the map
   * @param  {array} locations An array of locations to have markers added to the map
   */
  initMap = (markers) => {
    var bounds = new google.maps.LatLngBounds();

    map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'terrain'
    });

    for(var i = 0; i < markers.length; i ++){
      addMarker(markers[i].position, markers[i].title, markers[i].icon_file_location, markers[i].description, markers[i].id, markers[i].email, markers[i].image);
    }

    for(var x = 0; x < markersArray.length; x ++){
      bounds.extend(markersArray[x].getPosition())
    }

    map.fitBounds(bounds);


    //TO DO WHY DOES THIS NOT WORK
    // for(var v = 0; v < markersArray.length; v ++){
    //   console.log('looping1, ', v);
    //   markersArray[v].addListener('click', () =>{
    //     infoWindowArray[v].open(map, markersArray[v]);
    //   })
    // }

    // markersArray[0].addListener('click', () => {
    //   infoWindowArray[0].open(map, markersArray[0]);
    // })

    // markersArray[1].addListener('click', () => {
    //   infoWindowArray[1].open(map, markersArray[1]);
    // })

    // markersArray[2].addListener('click', () => {
    //   infoWindowArray[2].open(map, markersArray[2]);
    // })

    //TO DO = FIGURE OUT WTF THIS MEANS
    for (var f = 0; f < markersArray.length; f++) {
        // Keep value of 'i' in event creation
        (function(f) {
            google.maps.event.addListener(markersArray[f], 'click', function() {
                closeInfoWindows();
                infoWindowArray[f].open(map, markersArray[f]);
            });
        }(f));
    }


  }

  /**
   * Adds a marker to the map
   * @param  {google maps loc obj} location A google maps lat/long obj
   * @param  {string} title    Title of the marker
   */
  addMarker = (position, title, icon_file_location, description, id, email, image) => {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      icon:icon_file_location
    });

    var infoWindow ;
    console.log('owner ', isOwner)
    console.log('description: ', description)
    if(isOwner === true){

      if(image === true){
        if(infoWindow === undefined){
          infoWindow = new google.maps.InfoWindow({content: "<h3>"+title + `</h3><img class='tool-tip-image' src='./../images/${id}.jpg'><p>` + description + `</p><p>Created by: ${email}</p><button type="button" class="btn btn-warning" id="delete-marker-button" onClick="deleteMarker(${id})">Delete</button>
<div id="info-window-alert"></div>`});

        } else {
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: "<h3>"+title + `</h3><img class='tool-tip-image' src='./../images/${id}.jpg'><p>` + description + `</p><p>Created by: ${email}</p><button type="button" class="btn btn-warning" id="delete-marker-button" onClick="deleteMarker(${id})">Delete</button>
<div id="info-window-alert"></div>`});

        }


      } else {
        if(infoWindow === undefined){
          infoWindow = new google.maps.InfoWindow({content: "<h3>"+title + `</h3><p>` + description + `</p><p>Created by: ${email}</p><button type="button" class="btn btn-warning" id="delete-marker-button" onClick="deleteMarker(${id})">Delete</button>
<div id="info-window-alert"></div>`});

        } else {
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: "<h3>"+title + `</h3><p>` + description + `</p><p>Created by: ${email}</p><button type="button" class="btn btn-warning" id="delete-marker-button" onClick="deleteMarker(${id})">Delete</button>
<div id="info-window-alert"></div>`});

        }
      }

    } else {

      if(image === true){
        if(infoWindow === undefined){
          infoWindow = new google.maps.InfoWindow({content: "<h3>"+ title + `</h3><img class='tool-tip-image' src='./../images/${id}.jpg'><p>` + marker.description + `</p><p>Created by: ${email}</p>`});

        } else {
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: "<h3>"+ title + `</h3><img class='tool-tip-image' src='./../images/${id}.jpg'><p>` + marker.description + `</p><p>Created by: ${email}</p>`});

        }
      } else {
        if(infoWindow === undefined){
          infoWindow = new google.maps.InfoWindow({content: "<h3>"+ title + "</h3><p>" + description + `</p><p>Created by: ${email}</p>`});

        } else {
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: "<h3>"+ title + `</h3><p>` + description + `</p><p>Created by: ${email}</p>`});
        }
      }
    }

    infoWindowArray.push(infoWindow);
    markersArray.push(marker);
  }


  var toggleAddMarker = (event) => {
    if(markerClick === undefined || markerClick.getMap() === null){
      markerClick = new google.maps.Marker({
        position: event.latLng,
        map: map,
        icon:  'https://www.google.com/mapfiles/arrow.png'
      });
    } else {
      markerClick.setPosition(event.latLng);
    }
  }



  console.log(isOwner);
  initMap(markers);



  for(var i = 0; i < markerTypes.length; i ++){
    $('#marker-type-select').append(`<option data-id= ${markerTypes[i].id}>${markerTypes[i].title}</option>`)
  }

  $('form').submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    //Checking if a new marker has been placed on the map
    if(markerClick === null || markerClick === undefined || markerClick.getMap() === null){
      $('#alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong> No marker to add!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
      return;
    }

    //Checking to see if all form inputs have been filed out (except image)
    if( $('#marker-name').val().length === 0 || $('#marker-description').val().length === 0 || $('#marker-type-select').find(':selected').data('id') === undefined){
      $('#alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong> Missing new marker title, descrition, or marker type
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
      return;

    }

    $.ajax({
      url: '/markers/map/' + mapID + '/new',
      data: {
        markerName: $('#marker-name').val(),
        markerDescription: $('#marker-description').val(),
        position: {lat:markerClick.getPosition().lat(), lng:markerClick.getPosition().lng()},
        markerTypeID: $('#marker-type-select').find(':selected').data('id')
      },
      method: 'POST'
    }).done((id) => {
      console.log('New id: ', id);
      //checking if there is a picture to upload
      if(document.getElementById('marker-image-upload').files.length === 0){
        location.reload();
      } else {
        console.log('Attempting to upload');
        $.ajax({
            type: "POST",
            url: "/markers/" + id + "/image",
            data: formData,
            processData: false,
            contentType: false
        }).done(() => {
          location.reload();
        })
      }
    }).catch((err) => {
      alert('Some kind of error happened!');
    });

  });

  /**
   * Closes the info windows
   */
  closeInfoWindows = () => {
      for (var x = 0; x < infoWindowArray.length; x++) {
          infoWindowArray[x].close();
      }
  }

  /**
   * Deletes a marker
   * @param  {int} id ID of marker to be deleted
   */
  deleteMarker = (id) => {
    //Preventing from deleting all markers off a map
    if(markersArray.length === 1){
      $('#info-window-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      Maps must have at least one marker!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
      return;
    }

    var confirmBox = confirm("Are you sure?!");
    if (confirmBox == true) {
      $.ajax({
        url: '/markers/delete/' + id,
        data: {
          mapID: mapID
        },
        method: 'POST'
      }).done(() => {
        location.reload();

      }).catch((err) => {
        alert('Some kind of error happened!');
      });
    }

  }

  document.getElementById("toggle-on").addEventListener('click', () => {
    //When you click on the map, it adds a marker (only 1 "clicked" marker appears at a time)
    $('#toggle-on').css('display', 'none');
    $('#toggle-off').css('display', 'inline');
    $('#new-marker-button').css('display', 'inline');
    clickListener = map.addListener('click', toggleAddMarker);
  });


  document.getElementById("toggle-off").addEventListener('click', () => {
    $('#toggle-off').css('display', 'none');
    $('#new-marker-button').css('display', 'none');
    $('#toggle-on').css('display', 'inline');
    google.maps.event.removeListener(clickListener);
    markerClick.setMap(null);
  });

  // Get the modal
  const newMarkerModal = document.getElementById('new-marker-modal');

  // Get the button that opens the modal
  const newMarkerButton = document.getElementById("new-marker-button");

  // Get the <span> element that closes the modal
  const closeButton = document.getElementsByClassName("close-button");

  // When the user clicks on the button, open the modal
  newMarkerButton.onclick = function() {
      newMarkerModal.style.display = "block";
  }


  document.getElementById("close-button").addEventListener('click', () => {
    console.log('click')
    newMarkerModal.style.display = 'none';
  });

});
