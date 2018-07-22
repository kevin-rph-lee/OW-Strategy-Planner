
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        {name: 'Eichenwalde', type: 'hybrid', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/eichenwalde/', icon:'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/eichenwalde/icon.png'},
        {name: 'Hanamura', type: 'assault', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hanamura/', icon:'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hanamura/icon.png'},
        {name: 'Horizon', type: 'assault', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/horizon/', icon:'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/horizon/icon.png'},
        {name: 'Kings Row', type: 'hybrid', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/kingsrow/', icon:'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/kingsrow/icon.png'},
        {name: 'Numbani', type: 'hybrid', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/numbani/', icon:'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/numbani/icon.png'},
        {name: 'Rialto', type: 'escort', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/rialto/', icon:'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/rialto/icon.png'},
        {name: 'Watchpoint: Gibraltar', type: 'escort', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/watchpointgibraltar/', icon:'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/watchpointgibraltar/icon.png'},
        {name: 'Ilios', type: 'control', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/ilios/', icon:'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/ilios/icon.png'},
        {name: 'Lijiang Tower', type: 'control', url: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/lijiangtower/', icon:'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/lijiangtower/icon.png'}
      ]);
    });
};
