const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('steps').del()
    .then(function () {
      return Promise.all([
        knex('steps').insert({plan_id: 1, description: null}),
        knex('steps').insert({plan_id: 2, description: null}),
        knex('steps').insert({plan_id: 4, description: null}),
        knex('steps').insert({plan_id: 5, description: null}),
        knex('steps').insert({plan_id: 6, description: null}),
        knex('steps').insert({plan_id: 7, description: null}),
        knex('steps').insert({plan_id: 8, description: null}),
        knex('steps').insert({plan_id: 9, description: null}),
        knex('steps').insert({plan_id: 10, description: null}),
        knex('steps').insert({plan_id: 11, description: null}),
        knex('steps').insert({plan_id: 12, description: null}),
        knex('steps').insert({plan_id: 13, description: null}),
        knex('steps').insert({plan_id: 14, description: null}),
        knex('steps').insert({plan_id: 15, description: null}),
        knex('steps').insert({plan_id: 16, description: null}),
        knex('steps').insert({plan_id: 17, description: null}),
        knex('steps').insert({plan_id: 18, description: "test1"}),
        knex('steps').insert({plan_id: 18, description: "test2"}),
        knex('steps').insert({plan_id: 18, description: "test3"}),
        knex('steps').insert({plan_id: 18, description: "test4"})
      ]);
    });
};
