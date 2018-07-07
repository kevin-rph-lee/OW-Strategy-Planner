exports.up = function(knex, Promise) {
  return knex.schema.createTable('steps', function (table) {
    table.increments('id').primary();
    table.integer('plan_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('steps');
};
