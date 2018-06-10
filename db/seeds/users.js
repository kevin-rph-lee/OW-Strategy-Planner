const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({email: 'owner@gmail.com', password: bcrypt.hashSync('test', 10)})
      ]);
    });
};
