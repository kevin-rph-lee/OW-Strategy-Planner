const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('marker_types').del()
    .then(function () {
      return Promise.all([
        knex('marker_types').insert({title: 'Ana', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/ana_b.png'}),
        knex('marker_types').insert({title: 'Ana', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/ana_r.png'}),
        knex('marker_types').insert({title: 'Bastion', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/bastion_b.png'}),
        knex('marker_types').insert({title: 'Bastion', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/bastion_r.png'}),
        knex('marker_types').insert({title: 'Brigitte', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/brigitte_b.png'}),
        knex('marker_types').insert({title: 'Brigitte', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/brigitte_r.png'}),
        knex('marker_types').insert({title: 'Doomfist', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/doomfist_b.png'}),
        knex('marker_types').insert({title: 'Doomfist', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/doomfist_r.png'}),
        knex('marker_types').insert({title: 'Dva', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/dva.png'}),
        knex('marker_types').insert({title: 'Dva', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/dva_r.png'}),
        knex('marker_types').insert({title: 'Genji', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/genji_b.png'}),
        knex('marker_types').insert({title: 'Genji', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/genji_r.png'}),
        knex('marker_types').insert({title: 'Hanzo', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/hanzo_b.png'}),
        knex('marker_types').insert({title: 'Hanzo', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/hanzo_r.png'}),
        knex('marker_types').insert({title: 'Junkrat', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/junkrat_b.png'}),
        knex('marker_types').insert({title: 'Junkrat', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/junkrat_r.png'}),
        knex('marker_types').insert({title: 'Lucio', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/lucio_b.png'}),
        knex('marker_types').insert({title: 'Lucio', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/lucio_r.png'}),
        knex('marker_types').insert({title: 'McCree', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mccree_b.png'}),
        knex('marker_types').insert({title: 'McCree', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mccree_r.png'}),
        knex('marker_types').insert({title: 'Mei', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mei_b.png'}),
        knex('marker_types').insert({title: 'Mei', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mei_r.png'}),
        knex('marker_types').insert({title: 'Mercy', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mercy_b.png'}),
        knex('marker_types').insert({title: 'Mercy', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mercy_r.png'}),
        knex('marker_types').insert({title: 'Moira', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/moira_b.png'}),
        knex('marker_types').insert({title: 'Moira', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/moira_r.png'}),
        knex('marker_types').insert({title: 'Orisa', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/orisa_b.png'}),
        knex('marker_types').insert({title: 'Orisa', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/orisa_r.png'}),
        knex('marker_types').insert({title: 'Phara', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/phara_b.png'}),
        knex('marker_types').insert({title: 'Phara', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/phara_r.png'}),
        knex('marker_types').insert({title: 'Reaper', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/reaper_b.png'}),
        knex('marker_types').insert({title: 'Reaper', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/reaper_r.png'}),
        knex('marker_types').insert({title: 'Reinhardt', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/reinhardt_b.png'}),
        knex('marker_types').insert({title: 'Reinhardt', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/reinhardt_r.png'}),
        knex('marker_types').insert({title: 'Roadhog', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/roadhog_b.png'}),
        knex('marker_types').insert({title: 'Roadhog', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/roadhog_r.png'}),
        knex('marker_types').insert({title: 'Soldier76', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/soldier76_b.png'}),
        knex('marker_types').insert({title: 'Soldier76', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/soldier76_r.png'}),
        knex('marker_types').insert({title: 'Sombra', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/sombra_b.png'}),
        knex('marker_types').insert({title: 'Sombra', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/sombra_r.png'}),
        knex('marker_types').insert({title: 'Symmetra', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/symmetra_b.png'}),
        knex('marker_types').insert({title: 'Symmetra', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/symmetra_r.png'}),
        knex('marker_types').insert({title: 'Torbjorn', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/torbjorn_b.png'}),
        knex('marker_types').insert({title: 'Torbjorn', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/torbjorn_r.png'}),
        knex('marker_types').insert({title: 'Tracer', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/tracer_b.png'}),
        knex('marker_types').insert({title: 'Tracer', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/tracer_r.png'}),
        knex('marker_types').insert({title: 'Widowmaker', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/widowmaker_b.png'}),
        knex('marker_types').insert({title: 'Widowmaker', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/widowmaker_r.png'}),
        knex('marker_types').insert({title: 'Winston', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/winston_b.png'}),
        knex('marker_types').insert({title: 'Winston', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/winston_r.png'}),
        knex('marker_types').insert({title: 'Zarya', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/zarya_b.png'}),
        knex('marker_types').insert({title: 'Zarya', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/zarya_r.png'}),
        knex('marker_types').insert({title: 'Zenyatta', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/zenyatta_b.png'}),
        knex('marker_types').insert({title: 'Zenyatta', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/zenyatta_r.png'})
      ]);
    });
};



