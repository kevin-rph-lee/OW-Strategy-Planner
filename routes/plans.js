"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {





  router.get("/:id/draw", (req, res) => {
    knex
      .select('plans.name', 'plans.owner_id','markers.description','markers.title','markers.position','markers.description','markers.image','markers.type','users.email', 'markers.id', 'marker_types.icon_file_location', 'maps.url')
      .from('markers')
      .where({plan_id:req.params.id})
      .innerJoin('users', 'users.id', 'markers.owner_id')
      .innerJoin('marker_types', 'marker_types.id', 'markers.marker_type_id')
      .innerJoin('plans', 'plans.id', 'markers.plan_id')
      .innerJoin('maps', 'plans.map_id', 'maps.id')
      .then((markers) => {
        let isOwner = false;
        if(markers[0].owner_id !== req.session.userID){
          res.sendStatus(403);
          return;
        }

        knex
          .select('*')
          .from('marker_types')
          .then((markerTypes) => {
            res.render('plan_draw', {
              planID: req.params.id,
              email: req.session.email,
              userID: req.session.userID,
              markers:markers,
              markerTypes: markerTypes,
              isOwner: isOwner
            });
          });
      });
  });

  router.get("/:id", (req, res) => {
      knex
      .select('markers.id', 'markers.step_id', 'markers.title', 'markers.description', 'markers.title', 'markers.position', 'markers.image', 'markers.type', 'marker_types.icon_file_location')
      .from('steps')
      .where({plan_id:req.params.id})
      .innerJoin('plans', 'plans.id', 'steps.plan_id')
      .innerJoin('markers', 'steps.id', 'markers.step_id')
      .innerJoin('marker_types','marker_types.id', 'markers.marker_type_id')
      .then((markers) => {
          knex
          .select('polylines.step_id', 'polylines.coordinates')
          .from('steps')
          .where({plan_id:req.params.id})
          .innerJoin('plans', 'plans.id', 'steps.plan_id')
          .innerJoin('polylines', 'steps.id', 'polylines.id')
          .then((polylines) => {
              knex
              .select('*')
              .from('marker_types')
              .then((markerTypes) => {
                knex
                  .select("maps.url", 'plans.id', 'plans.owner_id')
                  .from("plans")
                  .where({"plans.id": req.params.id})
                  .innerJoin('maps', 'plans.map_id', 'maps.id')
                  .then((planInfo) => {
                      let isOwner = false;
                      if(planInfo[0].owner_id === req.session.userID){
                        isOwner = true;
                      }




                      knex
                        .select("id")
                        .from("steps")
                        .where({plan_id: req.params.id})
                        .then((stepIDs) => {
                            let isOwner = false;
                            if(planInfo[0].owner_id === req.session.userID){
                              isOwner = true;
                            }
                            const stepIDsArray = [];
                            for(let i = 0; i < stepIDs.length; i ++){
                              stepIDsArray.push(stepIDs[i].id.toString())
                            }
                            stepIDsArray.sort();

                            res.render('plan_view', {
                            // res.json({
                              markers:markers,
                              polylines:polylines,
                              markerTypes:markerTypes,
                              isOwner: isOwner,
                              planID: planInfo[0].id,
                              email: req.session.email,
                              planID: planInfo[0].id,
                              mapURL: planInfo[0],
                              stepIDs: stepIDsArray
                            })
                        });

                  });
              })

          })

      })
  });


  return router;
}











