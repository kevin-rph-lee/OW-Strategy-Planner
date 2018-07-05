exports.up = function(knex, Promise) {
  return knex.schema.createTable('steps', function (table) {
    table.increments('id').primary();
    table.string('plan_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('steps');
};
