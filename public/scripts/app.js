$(() => {


  const markersArray = [];
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    parking: {
      icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
      icon: iconBase + 'library_maps.png'
    },
    info: {
      icon: iconBase + 'info-i_maps.png'
    }
  };

  var markerClick;
  var infoWindow;

  /**
   * Initializes the map
   * @param  {array} locations An array of locations to have markers added to the map
   */
  initMap = (locations) => {
    var bounds = new google.maps.LatLngBounds();

    map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: 'terrain'
    });

    for(var i = 0; i < locations.length; i ++){
      addMarker(locations[i].pos, locations[i].title, locations[i].type, locations[i].desc, locations[i].id);
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
  addMarker = (location, title, type, desc, id) => {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title,
      icon: icons[type].icon,
      snippet: 'test'
    });
    marker.addListener('click', function() {
      if(infoWindow === undefined){
        infoWindow = new google.maps.InfoWindow({content: "<h3>"+marker.title + `</h3><img class='tool-tip-image' src='./images/${id}.jpg'><p>` + marker.desc + "</p>"});
        infoWindow.open(map, marker);
      } else {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({content: "<h3>"+marker.title + `</h3><img class='tool-tip-image' src='./images/${id}.jpg'><p>` + marker.desc + "</p>"});
        infoWindow.open(map, marker);
      }
    });
    //adding pointer id
    marker.desc = desc;
    markersArray.push(marker);
  }

  initMap(locations);

  //When you click on the map, it adds a marker (only 1 "clicked" marker appears at a time)
  map.addListener('click', function(event) {
    if(markerClick === undefined){
      markerClick = new google.maps.Marker({
        position: event.latLng,
        map: map,
        icon:  'https://www.google.com/mapfiles/arrow.png'
      });
    } else {
      markerClick.setPosition(event.latLng);
    }
  });

});
