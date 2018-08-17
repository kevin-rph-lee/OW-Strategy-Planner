
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers').del()
    .then(function () {
      // Inserts seed entries
      return knex('markers').insert([
        // {position:{lat: 0, lng: 0}, title: 'Parking Spot', marker_type_id: 3, description: 'test', owner_id: 1, step_id:1, image: true},
        // {position:{lat: 1, lng: 1}, title: 'Parking Spot', marker_type_id: 2, description: 'test', owner_id: 1, step_id:1, image: true},
        // {position:{lat: 2, lng: 2}, title: 'Parking Spot', marker_type_id: 2, description: 'test', owner_id: 1, step_id:2, image: true},
        // {position:{lat: 3, lng: 3}, title: 'Parking Spot', marker_type_id: 2, description: 'test', owner_id: 1, step_id:2, image: true},
        // {position:{lat: -3, lng: -4}, title: 'Parking Spot2', marker_type_id: 4, description: 'test', owner_id: 1, step_id:4, image: true},
        // {position:{lat: -3, lng: -4}, title: 'Parking Spot2', marker_type_id: 4, description: 'test', owner_id: 1, step_id:4, image: true}
        // {position:{lat: 37.769, lng: -122.546}, title: 'Camping Spot', marker_type_id: 3, description: 'Good parking2', owner_id: 1, plan_id:1, image: true},
        // {position:{lat: 37.469, lng: -122.246}, title: 'Dangerous Rocks', marker_type_id: 4, description: 'You will die here', owner_id: 1, plan_id:1, image: true}
      ]);
    });
};
