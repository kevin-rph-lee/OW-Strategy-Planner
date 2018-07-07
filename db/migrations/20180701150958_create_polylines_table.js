exports.up = function(knex, Promise) {
  return knex.schema.createTable('polylines', function (table) {
    table.increments('id').primary();
    table.integer('step_id');
    table.json('coordinates');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('polylines');
};
