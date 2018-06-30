
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        {name: 'Eichenwalde', type: 'hybrid', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/eichenwalde/'},
        {name: 'Hanamura', type: 'assault', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hanamura/'},
        {name: 'Horizon', type: 'assault', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/horizon/'},
        {name: 'Kings Row', type: 'hybrid', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/kingsrow/'},
        {name: 'Numbani', type: 'hybrid', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/numbani/'},
        {name: 'Rialto', type: 'escort', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/rialto/'},
        {name: 'Watchpoint: Gibraltar', type: 'escort', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/watchpointgibraltar/'}
      ]);
    });
};
