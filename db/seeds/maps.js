
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        {name: 'Desolation Sound', description: 'Stuff around desolation sound', owner_id: 1}
      ]);
    });
};
