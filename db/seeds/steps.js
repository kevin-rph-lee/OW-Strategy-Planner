const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('steps').del()
    .then(function () {
      return Promise.all([
        knex('steps').insert({plan_id: 1}),
        knex('steps').insert({plan_id: 1})
      ]);
    });
};
