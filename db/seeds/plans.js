
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('plans').del()
    .then(function () {
      // Inserts seed entries
      return knex('plans').insert([
        {name: 'Pirate Ship', description: 'RRRRRR', owner_id: 1, map_id: 1},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 2},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 3},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 4},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 5},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 6},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 7},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 8},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 9},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 1},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 2},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 3},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 4},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 5},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 6},
        {name: 'Test2', description: 'RRRRRR', owner_id: 1, map_id: 7}
      ]);
    });
};
