
exports.up = function(knex, Promise) {
  return knex.schema.createTable('marker_types', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.string('icon_file_location');
    table.boolean('teammate_icon');
    table.boolean('misc_icon');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('marker_types');
};

