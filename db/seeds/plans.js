const moment = require('moment');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('plans').del()
    .then(function () {
      // Inserts seed entries
      return knex('plans').insert([
        {name: 'Pirate Ship', description: 'RRRRRR', owner_id: 1, map_id: 1, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")}
      ]);
    });
};
