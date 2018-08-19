
exports.up = function(knex, Promise) {
  return knex.schema.createTable('markers', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.integer('owner_id');
    table.integer('step_id');
    table.json('position');
    table.boolean('image');
    table.integer('marker_type_id');
    table.string('video_URL')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('markers');
};

