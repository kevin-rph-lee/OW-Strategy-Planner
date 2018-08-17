
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('polylines').del()
    .then(function () {
      // Inserts seed entries
      return knex('polylines').insert([
        // {step_id: 1, coordinates: JSON.stringify({ coordinatesArray:
        //         [{lat: -57.56469240982394, lng: -74.3756662343776},
        //         {lat:  -58.125990315508346, lng: -79.6930490468776},
        //         {lat: -56.99460623981639, lng: -77.3639474843776},
        //         {lat: -59.86847143398984, lng: -77.0123849843776},
        //         {lat: -57.98648526597417, lng: -79.2535959218776}]
        //   })
        // },
        // {step_id: 2, coordinates: JSON.stringify({ coordinatesArray:
        //         [{lat: -56.01770278839883, lng: -86.27252663555134},
        //         {lat:   -58.649202167759086, lng: -92.99615944805134},
        //         {lat: -58.967829321350834, lng: -89.52447976055134},
        //         {lat: -56.98777001286622, lng: -85.92096413555134}]
        //   })
        // },
        // {step_id: 3, coordinates: JSON.stringify({ coordinatesArray:
        //         [{lat: -56.01770278839883, lng: -96.27252663555134},
        //         {lat:   -58.649202167759086, lng: -92.99615944805134},
        //         {lat: -58.967829321350834, lng: -89.52447976055134},
        //         {lat: -76.98777001286622, lng: -95.92096413555134}]
        //   })
        // }

      ]);
    });
};


