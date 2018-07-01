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
  initPlan = (markers) => {
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
        drawingModes: ['circle', 'polyline']
      }
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
            console.log(polyline.getPath().b[0].lat());
    });

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


  initPlan(markers);


  /**
   * Closes the info windows
   */
  closeInfoWindows = () => {
      for (var x = 0; x < infoWindowArray.length; x++) {
          infoWindowArray[x].close();
      }
  }



});
