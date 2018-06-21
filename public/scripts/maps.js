$(() => {

  console.log('Markers ', markers);

  const markersArray = [];
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
      addMarker(markers[i].position, markers[i].title, markers[i].icon_file_location, markers[i].description, markers[i].id, markers[i].email);
    }

    for(var x = 0; x < markersArray.length; x ++){
      bounds.extend(markersArray[x].getPosition())
    }

    map.fitBounds(bounds);

  }

  /**
   * Adds a marker to the map
   * @param  {google maps loc obj} location A google maps lat/long obj
   * @param  {string} title    Title of the marker
   */
  addMarker = (position, title, icon_file_location, description, id, email) => {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      icon:icon_file_location
    });
    marker.addListener('click', function() {
      if(infoWindow === undefined){
        infoWindow = new google.maps.InfoWindow({content: "<h3>"+marker.title + `</h3><img class='tool-tip-image' src='./../images/${id}.jpg'><p>` + marker.description + `</p><p>Created by: ${email}</p>`});
        infoWindow.open(map, marker);
      } else {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({content: "<h3>"+marker.title + `</h3><img class='tool-tip-image' src='./../images/${id}.jpg'><p>` + marker.description + `</p><p>Created by: ${email}</p>`});
        infoWindow.open(map, marker);
      }
    });
    //adding pointer id
    marker.description = description;
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

  var unToggleAddMarker = (event) => {
    console.log('Untoggle')
  }




  initMap(markers);



  for(var i = 0; i < markerTypes.length; i ++){
    $('#marker-type-select').append(`<option data-id= ${markerTypes[i].id}>${markerTypes[i].title}</option>`)
  }

  $('form').submit(function (e) {
    e.preventDefault();
    console.log($('#marker-name').val() + ' ' + $('#marker-description').val())
    console.log($('#marker-type-select').id)
    console.log('Click pos ', markerClick.getPosition().lat() + ' ' + markerClick.getPosition().lng())
    var formData = new FormData(this);

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
      if(document.getElementById('marker-image-upload').files.length !== 0){
        console.log('Attempting to upload');
        $.ajax({
            type: "POST",
            url: "/markers/4/image",
            data: formData,
            processData: false,
            contentType: false
        }).done(() => {
          console.log('File upload Success!')
        })
      }
    }).catch((err) => {

    });



  });

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
