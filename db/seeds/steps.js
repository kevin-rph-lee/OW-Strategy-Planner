const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('steps').del()
    .then(function () {
      return Promise.all([
        knex('steps').insert({plan_id: 1, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 2, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 4, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 5, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 6, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 7, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 8, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 9, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 10, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 11, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 12, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 13, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 14, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 15, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 16, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 17, description: 'Empty test step/plan'}),
        knex('steps').insert({plan_id: 18, description: 'Setup on cart with Bastion/Rein'}),
        knex('steps').insert({plan_id: 18, description: 'Flank highground to knock enemy off bridge'}),
        knex('steps').insert({plan_id: 18, description: 'Counter attacks from the rear with a Brigitte'}),
        knex('steps').insert({plan_id: 18, description: 'Use a soldier to counter a Pharmercy'})
      ]);
    });
};
