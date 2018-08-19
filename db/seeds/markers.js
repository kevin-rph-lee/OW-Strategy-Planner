
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers').del()
    .then(function () {
      // Inserts seed entries
      return knex('markers').insert([
        {position:{lat: -71.14331599163295, lng: -90.76393148744125}, title: 'Bastion base of fire', marker_type_id: 9, description: 'Bastion rides the payload and acts as the main base of fire. He relies on a shield tank for his defence. ', owner_id: 1, step_id:17, image: false, video_URL: 'hL9rndtnpls'},
        {position:{lat: -70.37841525146433, lng: -90.1910602759271}, title: 'Main Shield', marker_type_id: 39, description: 'A shield tank like Rein or Orisa protects Bastion as it moves. ', owner_id: 1, step_id:17, image: true, video_URL: null},
        {position:{lat: -73.16408842321407, lng: -82.62042385887457}, title: 'Tracer flank', marker_type_id: 52, description: 'Beware enemy Tracers from this direction. They can easily get around the shield protecting the Bastion. ', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: -71.32477086907501, lng: -91.83858621096306}, title: 'Mercy boost', marker_type_id: 29, description: 'Since the entire comp revolves around the Bastion. A Mercy should constantly be pocketing him. ', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: -62.38880659045638, lng: -92.41298606969292}, title: 'Enemy Sniper', marker_type_id: 2, description: 'Beware, the moment the shield goes down, a sniper from this position will go after the Bastion. ', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: -72.75931306709957, lng: -91.58437473545547}, title: 'Zen healing', marker_type_id: 59, description: 'While the Mercy pockets the Basion/Shield on the payload, Zen should be healing the rest of the team. ', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null},
        {position:{lat: , lng: }, title: '', marker_type_id: , description: '', owner_id: 1, step_id:17, image: false, video_URL: null}
      ]);
    });
};



// {"lat":-53.16960188744856,"lng":-76.83753330240523}
// {"lat":-60.035203753800715,"lng":-65.13498498712738}
// {"lat":-53.64419383621259,"lng":-77.30202712762798}
// {"lat":-58.15004885773306,"lng":-66.07976809490083}
// {"lat":-54.24582404699768,"lng":-68.48493064023415}
// {"lat":-51.28076812923984,"lng":-69.90095636546539}
// {"lat":-54.04913672566608,"lng":-58.73852485039521}
// {"lat":-53.943863398489455,"lng":-59.22482181208653}
// {"lat":-55.23264357447238,"lng":-57.565846848552894}
// {"lat":-52.26944668655975,"lng":-59.704642823670326}
// {"lat":-43.920752392708,"lng":-41.587116915039815}
// {"lat":-44.48641073553589,"lng":-42.66161116694519}
// {"lat":-44.639422871247106,"lng":-32.226190980066576}
// {"lat":-39.01337988384139,"lng":-28.610782126558206}
// {"lat":-33.84721823798452,"lng":-29.667030856580993}
