
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers').del()
    .then(function () {
      // Inserts seed entries
      return knex('markers').insert([
        {position:{lat: 37.969, lng: -122.246}, title: 'test1', type: 'parking', description: 'Good parking1', owner_id: 1, map_id:1, image: true},
        {position:{lat: 37.769, lng: -122.546}, title: 'test2', type: 'parking', description: 'Good parking2', owner_id: 1, map_id:1, image: true},
        {position:{lat: 37.469, lng: -122.246}, title: 'test3', type: 'parking', description: 'Good parking3', owner_id: 1, map_id:1, image: true}
      ]);
    });
};
