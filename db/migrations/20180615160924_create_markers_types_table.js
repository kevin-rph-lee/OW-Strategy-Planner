
exports.up = function(knex, Promise) {
  return knex.schema.createTable('marker_types', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.string('file_location');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('marker_types');
};

