exports.up = function(knex, Promise) {
  return knex.schema.createTable('steps', function (table) {
    table.increments('id').primary();
    table.integer('plan_id');
    table.integer('step_number')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('steps');
};
