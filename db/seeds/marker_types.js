const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('marker_types').del()
    .then(function () {
      return Promise.all([
        knex('marker_types').insert({title: 'Parking', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png', description: 'Good Parking Spots'}),
        knex('marker_types').insert({title: 'Fishing', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/fishing_maps.png', description: 'Good Fishing Spot'}),
        knex('marker_types').insert({title: 'Camping', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/campground_maps.png', description: 'Good Camping spot'}),
        knex('marker_types').insert({title: 'Danger', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/caution_maps.png', description: 'Dangerous Area'}),
        knex('marker_types').insert({title: 'Hiking', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/hiking_maps.png', description: 'Hiking Area'}),
        knex('marker_types').insert({title: 'Camp Fire', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/campfire_maps.png', description: 'Camp Fire Allowed'}),
        knex('marker_types').insert({title: 'Washroom', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/toilets_maps.png', description: 'Washroom area (outhouse or flush)'}),
        knex('marker_types').insert({title: 'Supplies', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/convenience_maps.png', description: 'Re-supply area'}),
        knex('marker_types').insert({title: 'Swimming', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/swimming_maps.png', description: 'Good Swimming Spot'}),
        knex('marker_types').insert({title: 'Cell service', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/arena_maps.png', description: 'Cell service available'}),
        knex('marker_types').insert({title: 'Photo Spot', icon_file_location: 'https://maps.google.com/mapfiles/kml/shapes/camera_maps.png', description: 'Photo Spot'}),
        knex('marker_types').insert({title: 'Other', icon_file_location: null, description: 'Other'})
      ]);
    });
};



