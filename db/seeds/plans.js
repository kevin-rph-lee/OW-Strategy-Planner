const moment = require('moment');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('plans').del()
    .then(function () {
      // Inserts seed entries
      return knex('plans').insert([
        {name: 'Pirate Ship', description: 'RRRRRR', owner_id: 1, map_id: 1, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 2, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 3, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 4, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 5, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 6, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 7, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 8, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 9, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 1, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 2, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 3, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 4, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 5, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 6, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 7, created_datetime: moment().format("H:mm d/M/YY"), updated_datetime: moment().format("H:mm d/M/YY")}
      ]);
    });
};
