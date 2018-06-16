const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('marker_types').del()
    .then(function () {
      return Promise.all([
        knex('marker_types').insert({title: 'Parking', file_location: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png', description: 'Good Parking Spots'}),
        knex('marker_types').insert({title: 'Fishing', file_location: 'https://maps.google.com/mapfiles/kml/shapes/fishing_maps.png', description: 'Good Fishing Spot'}),
        knex('marker_types').insert({title: 'Camping', file_location: 'https://maps.google.com/mapfiles/kml/shapes/camping_maps.png', description: 'Good Camping spot'}),
        knex('marker_types').insert({title: 'Danger', file_location: 'https://maps.google.com/mapfiles/kml/shapes/caution_maps.png', description: 'Dangerous Area'}),
        knex('marker_types').insert({title: 'Hiking', file_location: 'https://maps.google.com/mapfiles/kml/shapes/hiking_maps.png', description: 'Hiking Area'}),
        knex('marker_types').insert({title: 'Camp Fire', file_location: 'https://maps.google.com/mapfiles/kml/shapes/campfire_maps.png', description: 'Camp Fire Allowed'}),
        knex('marker_types').insert({title: 'Washroom', file_location: 'https://maps.google.com/mapfiles/kml/shapes/toilets_maps.png', description: 'Washroom area (outhouse or flush)'}),
        knex('marker_types').insert({title: 'Supplies', file_location: 'https://maps.google.com/mapfiles/kml/shapes/convenience_maps.png', description: 'Re-supply area'}),
        knex('marker_types').insert({title: 'Fishing', file_location: 'https://maps.google.com/mapfiles/kml/shapes/swimmping_maps.png', description: 'Good Swimming Spot'}),
        knex('marker_types').insert({title: 'Cell service', file_location: 'https://maps.google.com/mapfiles/kml/shapes/arena_maps.png', description: 'Cell service available'}),
        knex('marker_types').insert({title: 'Photo Spot', file_location: 'https://maps.google.com/mapfiles/kml/shapes/camera_maps.png', description: 'Photo Spot'}),
        knex('marker_types').insert({title: 'Other', file_location: null, description: 'Other'})
      ]);
    });
};



