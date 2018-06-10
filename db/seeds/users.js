
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Desolation Sound', description: 'Stuff around desolation sound', owner_id: 1}
      ]);
    });
};
