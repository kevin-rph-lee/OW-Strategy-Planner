$(() => {


  locations = [
  {pos:{lat: 37.969, lng: -122.246}, title: 'test1'},
  {pos:{lat: 37.769, lng: -122.446}, title: 'test2'},
  {pos:{lat: 37.469, lng: -122.646}, title: 'test3'}
  ]

  markers = [];

  initMap = () => {
    var bounds = new google.maps.LatLngBounds();

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 37.969, lng: -122.246},
      mapTypeId: 'terrain'
    });

    for(var i = 0; i < locations.length; i ++){
      console.log('loop 1')
      addMarker(locations[i].pos, locations[i].title);
    }


    for(var x = 0; x < markers.length; x ++){
      console.log('Loop 2')
      console.log(markers[x].getPosition());
      bounds.extend(markers[x].getPosition())
    }

    map.fitBounds(bounds);

  }

  addMarker = (location, title) => {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title
    });

    markers.push(marker);
  }

  initMap();
    // // This event listener will call addMarker() when the map is clicked.
    // map.addListener('click', function(event) {
    //   addMarker(event.latLng);
    // });

    // // Adds a marker at the center of the map.
    // addMarker(haightAshbury);


});
