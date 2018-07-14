"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {





  router.get("/:id/draw", (req, res) => {
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
          .from('polylines')
          .where({'plans.id':req.params.id})
          .innerJoin('steps', 'steps.id', 'polylines.step_id')
          .innerJoin('plans', 'plans.id', 'steps.plan_id')
          .then((polylines) => {
            console.log('polylines1: ', polylines)
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

                            res.render('plan_draw', {
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
          .from('polylines')
          .where({'plans.id':req.params.id})
          .innerJoin('steps', 'steps.id', 'polylines.step_id')
          .innerJoin('plans', 'plans.id', 'steps.plan_id')
          .then((polylines) => {
            console.log('polylines1: ', polylines)
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



  router.post("/new", (req, res) => {
    console.log(req.body)
    knex
    .insert({name: req.body.planName, description: req.body.planDescription, owner_id: req.session.userID, map_id: Number(req.body.mapTypeID) })
    .into('plans')
    .returning('id')
    .then((results)=> {
      knex
      .insert({plan_id:results[0]})
      .into('steps')
      .then((results)=> {
        console.log(results)
        res.sendStatus(200);
      })
    })
  });


  return router;
}











