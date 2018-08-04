const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({username: 'axel', password: bcrypt.hashSync('test', 10)})
      ]);
    });
};
