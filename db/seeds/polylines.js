
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('polylines').del()
    .then(function () {
      // Inserts seed entries
      return knex('polylines').insert([
        {step_id: 17, coordinates: JSON.stringify({ coordinatesArray:
                [{lat:-68.61293424466912,lng:-90.49836789305306},{lat:-65.11424107226249,lng:-93.75032101805306},{lat:-65.80773600987347,lng:-94.05793820555306},{lat:-65.49976030192589,lng:-92.60774289305306},{lat:-65.13272728247243,lng:-93.66243039305306}]
          })
        },
        {step_id: 17, coordinates: JSON.stringify({ coordinatesArray:
                [{lat:-73.04291955138866,lng:-83.32326472634406},{lat:-72.7325918600203,lng:-88.11330378884406},{lat:-72.39683685314436,lng:-89.87111628884406},{lat:-71.67865859836557,lng:-90.42043269509406},{lat:-71.85055038160235,lng:-90.55226863259406},{lat:-71.81629714143145,lng:-90.04689753884406},{lat:-71.67865859836557,lng:-90.42043269509406}]
          })
        }
      ]);
    });
};
