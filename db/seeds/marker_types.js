const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {

  return knex('marker_types').del()
    .then(function () {
      return Promise.all([
        knex('marker_types').insert({id: 1, title: 'Pointer', icon_file_location: null, misc_icon: true}),
        knex('marker_types').insert({id: 2, title: 'Danger', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/misc_icon/caution.png', misc_icon: true}),
        knex('marker_types').insert({id: 3, title: 'Sym Turret', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/misc_icon/symturret_b.png', misc_icon:true, teammate_icon: true}),
        knex('marker_types').insert({id: 4, title: 'Sym Turret (Enemy)', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/misc_icon/symturret_r.png', misc_icon:true}),
        knex('marker_types').insert({id: 5, title: 'Torb Turret', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/misc_icon/torbturret_b.png', misc_icon:true, teammate_icon: true}),
        knex('marker_types').insert({id: 6, title: 'Torb Turret (Enemy)', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/misc_icon/torbturret_r.png', misc_icon:true}),
        knex('marker_types').insert({id: 7, title: 'Ana', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/ana_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 8, title: 'Ana', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/ana_r.png'}),
        knex('marker_types').insert({id: 9, title: 'Bastion', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/bastion_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 10, title: 'Bastion', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/bastion_r.png'}),
        knex('marker_types').insert({id: 11, title: 'Brigitte', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/brigitte_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 12, title: 'Brigitte', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/brigitte_r.png'}),
        knex('marker_types').insert({id: 13, title: 'Doomfist', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/doomfist_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 14, title: 'Doomfist', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/doomfist_r.png'}),
        knex('marker_types').insert({id: 15, title: 'Dva', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/dva_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 16, title: 'Dva', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/dva_r.png'}),
        knex('marker_types').insert({id: 17, title: 'Genji', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/genji_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 18, title: 'Genji', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/genji_r.png'}),
        knex('marker_types').insert({id: 19, title: 'Hanzo', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/hanzo_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 20, title: 'Hanzo', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/hanzo_r.png'}),
        knex('marker_types').insert({id: 21, title: 'Junkrat', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/junkrat_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 22, title: 'Junkrat', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/junkrat_r.png'}),
        knex('marker_types').insert({id: 23, title: 'Lucio', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/lucio_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 24, title: 'Lucio', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/lucio_r.png'}),
        knex('marker_types').insert({id: 25, title: 'McCree', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mccree_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 26, title: 'McCree', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mccree_r.png'}),
        knex('marker_types').insert({id: 27, title: 'Mei', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mei_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 28, title: 'Mei', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mei_r.png'}),
        knex('marker_types').insert({id: 29, title: 'Mercy', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mercy_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 30, title: 'Mercy', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/mercy_r.png'}),
        knex('marker_types').insert({id: 31, title: 'Moira', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/moira_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 32, title: 'Moira', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/moira_r.png'}),
        knex('marker_types').insert({id: 33, title: 'Orisa', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/orisa_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 34, title: 'Orisa', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/orisa_r.png'}),
        knex('marker_types').insert({id: 35, title: 'Pharah', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/pharah_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 36, title: 'Pharah', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/pharah_r.png'}),
        knex('marker_types').insert({id: 37, title: 'Reaper', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/reaper_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 38, title: 'Reaper', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/reaper_r.png'}),
        knex('marker_types').insert({id: 39, title: 'Reinhardt', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/reinhardt_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 40, title: 'Reinhardt', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/reinhardt_r.png'}),
        knex('marker_types').insert({id: 41, title: 'Roadhog', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/roadhog_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 42, title: 'Roadhog', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/roadhog_r.png'}),
        knex('marker_types').insert({id: 43, title: 'Soldier76', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/soldier76_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 44, title: 'Soldier76', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/soldier76_r.png'}),
        knex('marker_types').insert({id: 45, title: 'Sombra', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/sombra_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 46, title: 'Sombra', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/sombra_r.png'}),
        knex('marker_types').insert({id: 47, title: 'Symmetra', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/symmetra_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 48, title: 'Symmetra', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/symmetra_r.png'}),
        knex('marker_types').insert({id: 49, title: 'Torbjorn', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/torbjorn_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 50, title: 'Torbjorn', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/torbjorn_r.png'}),
        knex('marker_types').insert({id: 51, title: 'Tracer', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/tracer_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 52, title: 'Tracer', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/tracer_r.png'}),
        knex('marker_types').insert({id: 53, title: 'Widowmaker', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/widowmaker_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 54, title: 'Widowmaker', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/widowmaker_r.png'}),
        knex('marker_types').insert({id: 55, title: 'Winston', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/winston_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 56, title: 'Winston', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/winston_r.png'}),
        knex('marker_types').insert({id: 57, title: 'Zarya', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/zarya_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 58, title: 'Zarya', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/zarya_r.png'}),
        knex('marker_types').insert({id: 59, title: 'Zenyatta', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/zenyatta_b.png', teammate_icon: true}),
        knex('marker_types').insert({id: 60, title: 'Zenyatta', icon_file_location: 'https://raw.githubusercontent.com/kevin-rph-lee/OWMaps/master/hero_icons/zenyatta_r.png'})
      ]);
    });
};



