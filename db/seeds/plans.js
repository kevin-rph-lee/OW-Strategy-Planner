const moment = require('moment');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('plans').del()
    .then(function () {
      // Inserts seed entries
      return knex('plans').insert([
        {name: 'Test Plan 1', description: 'A test plan', owner_id: 1, map_id: 1, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 2', description: 'A test plan', owner_id: 1, map_id: 2, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 3', description: 'A test plan', owner_id: 1, map_id: 3, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 4', description: 'A test plan', owner_id: 1, map_id: 4, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 5', description: 'A test plan', owner_id: 1, map_id: 5, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 6', description: 'A test plan', owner_id: 1, map_id: 6, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 7', description: 'A test plan', owner_id: 1, map_id: 7, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 8', description: 'A test plan', owner_id: 1, map_id: 8, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 9', description: 'A test plan', owner_id: 1, map_id: 9, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 10', description: 'A test plan', owner_id: 1, map_id: 10, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 11', description: 'A test plan', owner_id: 1, map_id: 11, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 12', description: 'A test plan', owner_id: 1, map_id: 12, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 13', description: 'A test plan', owner_id: 1, map_id: 13, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 14', description: 'A test plan', owner_id: 1, map_id: 14, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 15', description: 'A test plan', owner_id: 1, map_id: 15, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 16', description: 'A test plan', owner_id: 1, map_id: 17, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Test Plan 17', description: 'A test plan', owner_id: 1, map_id: 18, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")},
        {name: 'Pirate Ship', description: 'A shield and turret heavy attack plan', owner_id: 1, map_id: 16, created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")}
      ]);
    });
};
