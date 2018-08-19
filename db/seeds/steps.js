const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('steps').del()
    .then(function () {
      return Promise.all([
        knex('steps').insert({plan_id: 1}),
        knex('steps').insert({plan_id: 2}),
        knex('steps').insert({plan_id: 4}),
        knex('steps').insert({plan_id: 5}),
        knex('steps').insert({plan_id: 6}),
        knex('steps').insert({plan_id: 7}),
        knex('steps').insert({plan_id: 8}),
        knex('steps').insert({plan_id: 9}),
        knex('steps').insert({plan_id: 10}),
        knex('steps').insert({plan_id: 11}),
        knex('steps').insert({plan_id: 12}),
        knex('steps').insert({plan_id: 13}),
        knex('steps').insert({plan_id: 14}),
        knex('steps').insert({plan_id: 15}),
        knex('steps').insert({plan_id: 16}),
        knex('steps').insert({plan_id: 17}),
        knex('steps').insert({plan_id: 18}),
        knex('steps').insert({plan_id: 18}),
        knex('steps').insert({plan_id: 18}),
        knex('steps').insert({plan_id: 18})
      ]);
    });
};
