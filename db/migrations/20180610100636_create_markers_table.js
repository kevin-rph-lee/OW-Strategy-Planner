
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

