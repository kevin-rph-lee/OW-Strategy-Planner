exports.up = function(knex, Promise) {
  return knex.schema.createTable('plans', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.integer('owner_id');
    table.integer('map_id');
    table.string('created_datetime');
    table.string('updated_datetime');
    table.integer('view_count');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('plans');
};
