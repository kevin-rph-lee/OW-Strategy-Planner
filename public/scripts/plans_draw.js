$(() => {

  console.log('Markers ', markers);

  const markersArray = [];
  const infoWindowArray = [];
  var clickListener;
  var markerClick;
  var infoWindow;
  var linesFromDB = [];
  var newPolylines = [];

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

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polyline']
      },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 0.3,
        strokeWeight: 1,
        clickable: false,
        editable: true,
        zIndex: 1
      }
    });
    drawingManager.setMap(plan);
    google.maps.event.addDomListener(drawingManager, 'polylinecomplete', function (polyline) {
            // console.log(polyline.getPath().b[0].lat());
            newPolylines.push(polyline)
            console.log(polyline.getPath().b)
            var arr = polyline.getPath().b
            for(var i in arr){
              console.log('Point: ' + polyline.getPath().b[i].lat() + ' ' + polyline.getPath().b[i].lng());
            }

    });



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
    infoWindowArray.push(infoWindow);
    markersArray.push(marker);
  }

  $.ajax({
    url: '/polylines/' + planID,
    method: 'GET'
  }).done((polylines) => {

    initPlan(markers,polylines);

  }).catch((err) => {

  });

  //Clears the polylines from the plan and wipes the array
  $('#clear-button').click(function(){
    console.log('click clear')
    //Clearing the modal of it's current contents
    for(let i = 0; i < newPolylines.length; i ++){
      newPolylines[i].setMap(null);
    }
    while(newPolylines.length > 0) {
      newPolylines.pop();
    }
  });

  //Delete all polylines associated with that plan
  $('#delete-polylines').click(function(){
    $.ajax({
      url: '/polylines/' + planID + '/delete',
      data: {},
      method: 'POST'
    }).done(() => {
      location.reload();

    }).catch((err) => {

    });
  })

  //Clears the polylines from the plan and wipes the array
  $('#save-button').click(function(){
    //The total number of polylines that are pushed to the server
    const polyLinesToPush = []

    if(newPolylines.length === 0){
      $('#polyline-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      No polylines to add!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      $(".alert").delay(3000).fadeOut("slow");
      return;
    }


    for(let i = 0; i < newPolylines.length; i ++){
      let newPolyLineLatLngArray = []
      for(var y in newPolylines[i].getPath().b){
        let newPolyLineLatLng = {lat: Number(newPolylines[i].getPath().b[y].lat()), lng: Number(newPolylines[i].getPath().b[y].lng())}
        newPolyLineLatLngArray.push(newPolyLineLatLng)
        console.log('Point: ' + newPolylines[i].getPath().b[y].lat() + ' ' + newPolylines[i].getPath().b[y].lng());
      }
      polyLinesToPush.push(newPolyLineLatLngArray);
    }


    $.ajax({
      url: '/polylines/' + planID,
      data: {polylines: polyLinesToPush},
      method: 'POST'
    }).done(() => {
      location.reload();

    }).catch((err) => {

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



});
