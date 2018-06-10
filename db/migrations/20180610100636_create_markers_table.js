
exports.up = function(knex, Promise) {
  return knex.schema.createTable('markers', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.string('type');
    table.integer('owner_id');
    table.integer('map_id');
    table.json('position');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('markers');
};



  const locations = [
    {pos:{lat: 37.969, lng: -122.246}, title: 'test1', type: 'parking', id: 1, desc: 'Good parking1'},
    {pos:{lat: 37.769, lng: -122.446}, title: 'test2', type: 'parking', id: 2, desc: 'Good parking2'},
    {pos:{lat: 37.469, lng: -122.646}, title: 'test3', type: 'parking', id: 3, desc: 'Good parking3'}
  ];
