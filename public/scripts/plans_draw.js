$(() => {

  const markersArray = [];
  const infoWindowArray = [];
  const polylinesArray = [];
  const newPolylines = [];
  let clickListener;
  let markerClick;
  let infoWindow;
  let currentStep = {
    id: Number(stepIDs[0].id),
    number: 1
  }

  //Adds markers, lines, and step descriptions to the page
  addMarkersLinesAndDescriptions = (stepID) => {
    //Adding polylines
    for (let y = 0; y < polylines.length; y ++) {
      if (polylines[y].step_id === stepID) {
        addPolyline(polylines[y]);
      }
    }

    //Adding Markers & event listeners
    for (let i = 0; i < markers.length; i ++) {
      if (markers[i].step_id === stepID) {
        addMarker(markers[i]);
      }
    }

    //Adding step descriptions
    for (let x = 0; x < stepIDs.length; x ++) {
      if (Number(stepID) === Number(stepIDs[x].id)) {
        $('.plan-description').html(stepIDs[x].description);
      }
    }
  }

  //Moving to next step within pagination
  $('#step-forward').click(function (e) {
    for(let i = 0; i < stepIDs.length; i++){
      if(currentStep.id === Number(stepIDs[i].id)){
        //Checking to see if you've hit the end of the list of steps
        if(stepIDs[i +1] === undefined){
          return;
        } else {

          //moving the pagination active marker
          $('.active').next().addClass('active');
          $( '.active' ).first().removeClass( 'active' );

          clearMarkersAndPolylines();

          addMarkersLinesAndDescriptions(Number(stepIDs[i].id + 1))
          currentStep.number++
          currentStep.id = Number(stepIDs[i].id + 1);
          return;
        }

      }
    }
  })

  //Moving to previous step within pagination
  $('#step-backwards').click(function (e) {
    for (let i = 0; i < stepIDs.length; i++) {
      if (currentStep.id === Number(stepIDs[i].id)) {

        //Checking to see if you've hit the end of the list of steps
        if (stepIDs[i-1] === undefined) {
          return;
        } else {

          //moving the pagination active marker
          $('.active').prev().addClass('active');
          $( '.active' ).last().removeClass('active');

          clearMarkersAndPolylines();

          addMarkersLinesAndDescriptions(Number(stepIDs[i].id - 1))
          currentStep.number--
          currentStep.id = Number(stepIDs[i].id - 1);

          return;
        }
      }
    }
  })

  //Clicking on a pagination button to skip to a step
  $('.step-to').click(function () {

    //Removeing the active class and swapping it with the active
    $('.active').removeClass('active')
    $(this).addClass('active');

    //Updating the current step and step id
    currentStep.number = $(this).data('step-number');
    currentStep.id = $(this).data('step-id');

    //Clearing polylines and markers along with re-adding the new ones
    clearMarkersAndPolylines();
    addMarkersLinesAndDescriptions(Number($(this).data('step-id')))
  })


  /**
   * Initializes the plan
   * @param  {array} locations An array of locations to have markers added to the plan
   */
  initPlan = (markers, polylines, stepID) => {
    // let bounds = new google.maps.LatLngBounds();

    plan = new google.maps.Map(document.getElementById('plan'), {
      center: {lat: -55.60427598849055, lng: -64.92253974426148},
      zoom: 5,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['OW']
      }
    });
    let OWMapType = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
          let normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          let bound = Math.pow(2, zoom);
          return mapURL.url + zoom + '/' + normalizedCoord.x + '/' +
              (bound - normalizedCoord.y - 1) + '.png';
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 6,
      minZoom: 4
    });


    let allowedBounds;
    if(mapType !== 'Control'){
      //Defining out far out a user is able to pan  SW corner first, NE corner second
      allowedBounds = new google.maps.LatLngBounds(
           new google.maps.LatLng(-76.53872912052131, -122.52994923110276),
           new google.maps.LatLng(-12.670418295569519, -12.480669814400471));
    } else {
      //Defining out far out a user is able to pan
      allowedBounds = new google.maps.LatLngBounds(
           new google.maps.LatLng(-76.64062074438048, -121.80094949737884),
           new google.maps.LatLng(-13.375349018704462, 97.22468850116775));

    }

    //Listnes to drag event, if it goes out of bounds, auto pan the user back within bounds
    google.maps.event.addListener(plan, 'dragend', function() {
       if (allowedBounds.contains(plan.getCenter())) return;

       // Out of bounds - Move the map back within the bounds

       let c = plan.getCenter(),
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


    plan.mapTypes.set('OW', OWMapType);
    plan.setMapTypeId('OW');

    //NOTE: How to auto zoom around all markers
    // for(let x = 0; x < markersArray.length; x ++){
    //   bounds.extend(markersArray[x].getPosition())
    // }

    // plan.fitBounds(bounds);
    addMarkersLinesAndDescriptions(currentStep.id);


    //Creating the draw manager to draw polylines on the map
    let drawingManager = new google.maps.drawing.DrawingManager({
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

    //pushes newly drawn polyline to the newPolylines array
    google.maps.event.addDomListener(drawingManager, 'polylinecomplete', function (polyline) {
            // console.log(polyline.getPath().b[0].lat());
            newPolylines.push(polyline)
            // Used for troubleshooting:
            // console.log(polyline.getPath().b)
            // let arr = polyline.getPath().b
            // for(let i in arr){
            //   console.log('Point: ' + polyline.getPath().b[i].lat() + ' ' + polyline.getPath().b[i].lng());
            // }
    });
  }

  /**
   * Gets normalized coordinates for the map. Used only when the map is initialized
   */
  getNormalizedCoord = (coord, zoom) => {
    let y = coord.y;
    let x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    let tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
      return null;
    }

    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {x: x, y: y};
  }

  //Add's a single polyline to the map
  addPolyline = (polylineToAdd) => {
    let polylineCoordinates = []
    // console.log(polylines[i].coordinates.coordinatesArray);
    for(let y = 0; y < polylineToAdd.coordinates.coordinatesArray.length; y ++){
      let newPolyline = new google.maps.Polyline({
        path: polylineToAdd.coordinates.coordinatesArray,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      polylinesArray.push(newPolyline)
      newPolyline.setMap(plan);
    }
  }

  /**
   * Adds an individual marker to the map
   * @param  {google maps loc obj} location A google maps lat/long obj
   * @param  {string} title    Title of the marker
   */
  // addMarker = (position, title, icon_file_location, description, id, email, image) => {
  addMarker = (markerToAdd) => {

    let marker = new google.maps.Marker({
      position: markerToAdd.position,
      map: plan,
      title: markerToAdd.title,
      icon: markerToAdd.icon_file_location
    });

    let infoWindow;
    //If owner, has the ability to delete the marker
    if (isOwner === true) {
      //Checking if marker has an image OR video OR nothing
      if (markerToAdd.image === true) {
        //Adding info window
        if (infoWindow === undefined) {
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><img class='tool-tip-image' src='/./../images/${markerToAdd.id}.jpg'><p>` + markerToAdd.description + `</p><button type='button' class='btn btn-warning' id='delete-marker-button' onClick='deleteMarker(${markerToAdd.id})'>Delete</button>
<div id='info-window-alert'></div>`});
        } else {
          //If another info window is already opened, closing
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><img class='tool-tip-image' src='/./../images/${markerToAdd.id}.jpg'><p>` + markerToAdd.description + `</p><button type='button' class='btn btn-warning' id='delete-marker-button' onClick='deleteMarker(${markerToAdd.id})'>Delete</button>
<div id='info-window-alert'></div>`});
        }
      } else if (markerToAdd.video_URL) {
        //Adding info window
        if(infoWindow === undefined) {
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><iframe width="420" height="315" src="https://www.youtube.com/embed/${markerToAdd.video_URL}"></iframe><p>` + markerToAdd.description + `</p><button type='button' class='btn btn-warning' id='delete-marker-button' onClick='deleteMarker(${markerToAdd.id})'>Delete</button>
<div id='info-window-alert'></div>`});
        } else {
          //If another info window is already opened, closing
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><iframe width="420" height="315" src="https://www.youtube.com/embed/${markerToAdd.video_URL}"></iframe><p>` + markerToAdd.description + `</p><button type='button' class='btn btn-warning' id='delete-marker-button' onClick='deleteMarker(${markerToAdd.id})'>Delete</button>
<div id='info-window-alert'></div>`});
        }
      } else {
        //Adding info window
        if(infoWindow === undefined) {
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><p>` + markerToAdd.description + `</p><button type='button' class='btn btn-warning' id='delete-marker-button' onClick='deleteMarker(${markerToAdd.id})'>Delete</button>
<div id='info-window-alert'></div>`});
        } else {
          //If another info window is already opened, closing
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><p>` + markerToAdd.description + `</p><button type='button' class='btn btn-warning' id='delete-marker-button' onClick='deleteMarker(${markerToAdd.id})'>Delete</button>
<div id='info-window-alert'></div>`});
        }
      }
    } else {
      //None owners do not see delete options
      if (markerToAdd.image === true) {
        if (infoWindow === undefined) {
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><img class='tool-tip-image' src='/./../images/${markerToAdd.id}.jpg'><p>` + markerToAdd.description + `</p>`});
        } else {
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><img class='tool-tip-image' src='/./../images/${markerToAdd.id}.jpg'><p>` + markerToAdd.description + `</p>`});

        }
      } else if (markerToAdd.video_URL) {
        if (infoWindow === undefined) {
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + '</h3><iframe width="420" height="315" src="https://www.youtube.com/embed/${markerToAdd.video_URL}"></iframe><p>' + markerToAdd.description + `</p>`});

        } else {
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><iframe width="420" height="315" src="https://www.youtube.com/embed/${markerToAdd.video_URL}"></iframe><p>` + markerToAdd.description + `</p>`});
        }
      } else {
        if (infoWindow === undefined) {
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + '</h3><p>' + markerToAdd.description + `</p>`});
        } else {
          infoWindow.close();
          infoWindow = new google.maps.InfoWindow({content: '<h3>'+ markerToAdd.title + `</h3><p>` + markerToAdd.description + `</p>`});
        }
      }
    }

    //Adding all of the info windows
    infoWindowArray.push(infoWindow);

    //Adding click listener to the markers to open the info windows
    google.maps.event.addListener(marker, 'click', function() {
        closeInfoWindows();
        infoWindow.open(plan, marker);
    });

    //Pushing the marker to the array
    markersArray.push(marker);

  }

  //Saving polylines to the DB
  $('#save-button').click(function(){
    //The total number of polylines that are pushed to the server
    const polyLinesToPush = []

    //Checking if there actually polylines drawn to the map
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

    //Converting the polylines into a format the AJAX request can take
    for(let i = 0; i < newPolylines.length; i ++){
      let newPolyLineLatLngArray = []
      for(let y in newPolylines[i].getPath().b){
        let newPolyLineLatLng = {lat: Number(newPolylines[i].getPath().b[y].lat()), lng: Number(newPolylines[i].getPath().b[y].lng())}
        newPolyLineLatLngArray.push(newPolyLineLatLng)
        console.log('Point: ' + newPolylines[i].getPath().b[y].lat() + ' ' + newPolylines[i].getPath().b[y].lng());
      }
      polyLinesToPush.push(newPolyLineLatLngArray);
    }

    //Pushing the polylines
    $.ajax({
      url: '/polylines/step/' + currentStep.id,
      data: {planID: planID, polylines: polyLinesToPush},
      method: 'POST'
    }).done(() => {
      console.log('Reload?')
      location.reload();

    }).catch((err) => {

    });


  });

  initPlan(markers, polylines, currentStep.id, mapType);

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

  /**
   * Closes the info windows
   */
  closeInfoWindows = () => {
      for (let x = 0; x < infoWindowArray.length; x++) {
          infoWindowArray[x].close();
      }
  }

  //Delete all polylines associated with that plan
  $('#delete-polylines').click(function(){
    $.ajax({
      url: '/polylines/' + currentStep.id + '/delete',
      data: {planID: planID},
      method: 'POST'
    }).done(() => {
      location.reload();

    }).catch((err) => {

    });
  })

  /**
   * Clears all polylines and markers currently active on the plan
   */
  clearMarkersAndPolylines = () =>{
    console.log('Markers Array1: ', markersArray)
    console.log('Polylines Array1: ', polylinesArray)
    //Removing Markers
    for (let i = 0; i < markersArray.length; i ++) {
      // markersArray[i].removeListener();
      // markersArray[i].removeEventListener("click");
      markersArray[i].setMap(null);
    }
    //Removing Polylines
    for (let y = 0; y < polylinesArray.length; y ++) {
      // markersArray[i].removeListener();
      // markersArray[i].removeEventListener("click");
      polylinesArray[y].setMap(null);
    }
    markersArray.length = 0;
    infoWindowArray.length = 0;
    polylinesArray.length = 0;
  }

});
