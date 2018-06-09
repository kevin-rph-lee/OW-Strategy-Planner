$(() => {


  const locations = [
    {pos:{lat: 37.969, lng: -122.246}, title: 'test1', type: 'parking', id: 1, desc: 'Good parking1'},
    {pos:{lat: 37.769, lng: -122.446}, title: 'test2', type: 'parking', id: 2, desc: 'Good parking2'},
    {pos:{lat: 37.469, lng: -122.646}, title: 'test3', type: 'parking', id: 3, desc: 'Good parking3'}
  ];



  const markers = [];
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
      addMarker(locations[i].pos, locations[i].title, locations[i].type, locations[i].desc);
    }

    for(var x = 0; x < markers.length; x ++){
      bounds.extend(markers[x].getPosition())
    }

    map.fitBounds(bounds);

  }

  /**
   * Adds a marker to the map
   * @param  {google maps loc obj} location A google maps lat/long obj
   * @param  {string} title    Title of the marker
   */
  addMarker = (location, title, type, desc) => {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title,
      icon: icons[type].icon,
      snippet: 'test'
    });
    marker.addListener('click', function() {
      var infowindow = new google.maps.InfoWindow({content: "<h3>"+marker.title + "</h3><p>" + marker.desc + "</p>"});
      // infowindow.open(map, marker);
      infowindow.open(map, marker);
    });
    //adding pointer id
    marker.desc = desc;
    markers.push(marker);
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
