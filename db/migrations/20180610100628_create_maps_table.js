exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('type');
    table.string('url');
    table.string('icon');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
