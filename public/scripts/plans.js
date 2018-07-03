$(() => {

  console.log('Markers ', markers);

  const markersArray = [];
  const infoWindowArray = [];
  var clickListener;
  var markerClick;
  var infoWindow;
  var lines = [];

  /**
   * Initializes the plan
   * @param  {array} locations An array of locations to have markers added to the plan
   */
  initPlan = (markers, polylines) => {
    // var bounds = new google.maps.LatLngBounds();

    plan = new google.maps.Map(document.getElementById('plan'), {
      center: {lat: -55.60427598849055, lng: -64.92253974426148},
      zoom: 5,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['OW']
      }
    });

    var OWMapType = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          var bound = Math.pow(2, zoom);
          return `${markers[0].url}` + zoom + '/' + normalizedCoord.x + '/' +
              (bound - normalizedCoord.y - 1) + '.png';
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 6,
      minZoom: 4,
      name: markers[0].name
    });


    //Defining out far out a user is able to pan
    const allowedBounds = new google.maps.LatLngBounds(
         new google.maps.LatLng(-76.53872912052131, -122.52994923110276),
         new google.maps.LatLng(-12.670418295569519, -12.480669814400471));

    //Listnes to drag event, if it goes out of bounds, auto pan the user back within bounds
    google.maps.event.addListener(plan, 'dragend', function() {
       if (allowedBounds.contains(plan.getCenter())) return;

       // Out of bounds - Move the map back within the bounds

       var c = plan.getCenter(),
           x = c.lng(),
           y = c.lat(),
           maxX = allowedBounds.getNorthEast().lng(),
           maxY = allowedBounds.getNorthEast().lat(),
           minX = allowedBounds.getSouthWest().lng(),
           minY = allowedBounds.getSouthWest().lat();

       if (x < minX) x = minX;
       if (x > maxX) x = maxX;
       if (y < minY) y = minY;
       if (y > maxY) y = maxY;

       plan.setCenter(new google.maps.LatLng(y, x));
    })

    var linesFromDB = [];

    for(let i = 0; i < polylines.length; i ++){
      let polylineCoordinates = []
      console.log(polylines[i].coordinates.coordinatesArray);
      for(let y = 0; y < polylines[i].coordinates.coordinatesArray.length; y ++){
        var newPolyline = new google.maps.Polyline({
          path: polylines[i].coordinates.coordinatesArray,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        linesFromDB.push(newPolyline)
        newPolyline.setMap(plan);
      }

    }

    plan.mapTypes.set('OW', OWMapType);
    plan.setMapTypeId('OW');

    for(var i = 0; i < markers.length; i ++){
      addMarker(markers[i].position, markers[i].title, markers[i].icon_file_location, markers[i].description, markers[i].id, markers[i].email, markers[i].image);
    }

    //NOTE: How to auto zoom around all markers
    // for(var x = 0; x < markersArray.length; x ++){
    //   bounds.extend(markersArray[x].getPosition())
    // }

    // plan.fitBounds(bounds);


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
                infoWindowArray[f].open(plan, markersArray[f]);
            });
        }(f));
    }
  }



  // function bindDataLayerListeners(dataLayer) {
  //     dataLayer.addListener('addfeature', savePolygon);
  //     dataLayer.addListener('removefeature', savePolygon);
  //     dataLayer.addListener('setgeometry', savePolygon);
  // }

  // function savePolygon() {
  //     plan.data.toGeoJson(function (json) {
  //         console.log(JSON.stringify(json));
  //         // sessionStorage.setItem('geoData', JSON.stringify(json));
  //     });
  // }

  // //Depending on what radio button is selected within the new marker modal, the marker type dropdown is populated.
  // $('#test').click(function(){
  //   //Clearing the modal of it's current contents
  //   savePolygon();
  // });


  /**
   * Gets normalized coordinates for the map. Used only when the map is initialized
   */
  getNormalizedCoord = (coord, zoom) => {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
      return null;
    }

    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {x: x, y: y};
  }


  /**
   * Adds a marker to the map
   * @param  {google maps loc obj} location A google maps lat/long obj
   * @param  {string} title    Title of the marker
   */
  addMarker = (position, title, icon_file_location, description, id, email, image) => {
    var marker = new google.maps.Marker({
      position: position,
      map: plan,
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
        map: plan,
        icon:  'https://www.google.com/mapfiles/arrow.png'
      });
    } else {
      markerClick.setPosition(event.latLng);
    }
  }



  $.ajax({
    url: '/polylines/' + planID,
    method: 'GET'
  }).done((polylines) => {

    initPlan(markers,polylines);

  }).catch((err) => {

  });

  //Depending on what radio button is selected within the new marker modal, the marker type dropdown is populated.
  $('#teammates[type="radio"]').click(function(){
    //Clearing the modal of it's current contents
    $("#marker-type-select").children().remove();
    for(var i = 0; i < markerTypes.length; i ++){
      if(markerTypes[i].misc_icon !== true && markerTypes[i].teammate_icon === true){
        $('#marker-type-select').append(`<option data-id= ${markerTypes[i].id}>${markerTypes[i].title}</option>`)
      }
    }
  });
  //Depending on what radio button is selected within the new marker modal, the marker type dropdown is populated.
  $('#enemy[type="radio"]').click(function(){
    //Clearing the modal of it's current contents
    $("#marker-type-select").children().remove();
    for(var i = 0; i < markerTypes.length; i ++){
      if(markerTypes[i].misc_icon !== true && markerTypes[i].teammate_icon !== true){
        $('#marker-type-select').append(`<option data-id= ${markerTypes[i].id}>${markerTypes[i].title}</option>`)
      }
    }
  });
  //Depending on what radio button is selected within the new marker modal, the marker type dropdown is populated.
  $('#other[type="radio"]').click(function(){
    //Clearing the modal of it's current contents
    $("#marker-type-select").children().remove();
    for(var i = 0; i < markerTypes.length; i ++){
      if(markerTypes[i].misc_icon === true){
        $('#marker-type-select').append(`<option data-id= ${markerTypes[i].id}>${markerTypes[i].title}</option>`)
      }
    }
  });



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
      url: '/markers/plan/' + planID + '/new',
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
        $.ajax({
            type: "POST",
            url: "/markers/" + id + "/image",
            data: formData,
            processData: false,
            contentType: false
        }).done(() => {
          location.reload();
        }).catch((err) =>{
          $('#alert').append(`
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>OOPS!</strong> Invalid File type!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
          `)
          $(".alert").delay(3000).fadeOut("slow");
        });
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
          planID: planID
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
    clickListener = plan.addListener('click', toggleAddMarker);
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
