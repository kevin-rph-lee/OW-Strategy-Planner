
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
        {position:{lat: -53.16960188744856, lng: -76.83753330240523}, title: 'Payload', marker_type_id: 1, description: 'Payload', owner_id: 1, step_id:18, image: false, video_URL: null},
        {position:{lat: -60.035203753800715, lng: -65.13498498712738}, title: 'Enemy Base of FIre', marker_type_id: 6, description: 'Enemy will often use the high ground and setup a turret', owner_id: 1, step_id:18, image: false, video_URL: null},
        {position:{lat: -53.64419383621259, lng: -77.30202712762798}, title: 'Bastion base of fire', marker_type_id: 9, description: 'Have your Bastion get off the payload and hold your ground until the high ground is cleared.', owner_id: 1, step_id:18, image: false, video_URL: null},
        {position:{lat: -58.15004885773306, lng: -66.07976809490083}, title: 'Enemy snipers', marker_type_id: 54, description: 'Enemy team will utilize this bridge as the payload moves around the corner to get picks with snipers. ', owner_id: 1, step_id:18, image: false, video_URL: null},
        {position:{lat: -54.24582404699768, lng: -68.48493064023415}, title: 'D.Va Flank', marker_type_id: 15, description: "Use D.Va's boosters to get to the high ground and flank the enemy setup", owner_id: 1, step_id:18, image: false, video_URL: null},
        {position:{lat: -51.28076812923984, lng: -69.90095636546539}, title: 'Winston flank', marker_type_id: 55, description: "Use Winston's rocket pack with the D.Va to head up and tank the high ground to flank", owner_id: 1, step_id:18, image: false, video_URL: null},
        {position:{lat: -54.04913672566608, lng: -58.73852485039521}, title: 'Payload', marker_type_id: 1, description: 'Payload', owner_id: 1, step_id:19, image: false, video_URL: null},
        {position:{lat: -53.943863398489455, lng: -59.22482181208653}, title: 'Bastion base of fire', marker_type_id: 9, description: 'Bastion continues to dole out extra firepower', owner_id: 1, step_id:19, image: false, video_URL: null},
        {position:{lat: -55.23264357447238, lng: -57.565846848552894}, title: 'Brigitte protection against flankers', marker_type_id: 11, description: "Due to the increased highground for defenders. The Zen should be swapped out with a Brig to defend against Genji's and Tracers.", owner_id: 1, step_id:19, image: false, video_URL: null},
        {position:{lat: -52.26944668655975, lng: -59.704642823670326}, title: 'Orisa', marker_type_id: 33, description: "A Rein can't do much below, an Orisa will increase the firepower to find off enemies on the top high ground.", owner_id: 1, step_id:19, image: false, video_URL: null},
        {position:{lat: -43.920752392708, lng: -41.587116915039815}, title: 'Payload', marker_type_id: 1, description: 'Payload', owner_id: 1, step_id:20, image: false, video_URL: null},
        {position:{lat: -44.48641073553589, lng: -42.66161116694519}, title: 'Bastion base of fire', marker_type_id: 9, description: 'Bastion, again, is the lynchpin of the plan. ', owner_id: 1, step_id:20, image: false, video_URL: null},
        {position:{lat: -44.639422871247106, lng: -32.226190980066576}, title: 'Soldier anti-Pharah', marker_type_id: 43, description: 'Enemies will run an Pharmercy to try to counter the Bastion, keep a soldier up here to counter. ', owner_id: 1, step_id:20, image: false, video_URL: null},
        {position:{lat: -39.01337988384139, lng: -28.610782126558206}, title: 'Pharmercy Counter', marker_type_id: 36, description: 'Enemies will run a Pharmercy to flank the shield and get at the Bastion. ', owner_id: 1, step_id:20, image: true, video_URL: null},
        {position:{lat: -33.84721823798452, lng: -29.667030856580993}, title: 'Mercy pocket heal', marker_type_id: 30, description: 'Mercy will pocket heal the Pharah to get in the required 2 shots to take out the Bastion. ', owner_id: 1, step_id:20, image: false, video_URL: null}
      ]);
    });
};



