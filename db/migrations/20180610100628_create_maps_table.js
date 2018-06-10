exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.integer('owner_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
