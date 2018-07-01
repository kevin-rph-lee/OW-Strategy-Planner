
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('polylines').del()
    .then(function () {
      // Inserts seed entries
      return knex('polylines').insert([
        {plan_id: '1', coordinates: JSON.stringify({ coordinatesArray:
                [{lat: -57.56469240982394, lng: -74.3756662343776},
                {lat:  -58.125990315508346, lng: -79.6930490468776},
                {lat: -56.99460623981639, lng: -77.3639474843776},
                {lat: -59.86847143398984, lng: -77.0123849843776},
                {lat: -57.98648526597417, lng: -79.2535959218776}]
          })
        }
      ]);
    });
};
