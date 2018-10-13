"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, moment) => {

  //Showing draw page
  router.get("/:id/draw", (req, res) => {
      //Grabbing markers
      knex
      .select('markers.id', 'markers.step_id', 'markers.title', 'markers.description', 'markers.title', 'markers.position', 'markers.image', 'marker_types.icon_file_location', 'markers.video_URL')
      .from('steps')
      .where({plan_id:req.params.id})
      .innerJoin('plans', 'plans.id', 'steps.plan_id')
      .innerJoin('markers', 'steps.id', 'markers.step_id')
      .innerJoin('marker_types','marker_types.id', 'markers.marker_type_id')
      .then((markers) => {
          //Grabbing polylines
          knex
          .select('polylines.step_id', 'polylines.coordinates')
          .from('polylines')
          .where({'plans.id':req.params.id})
          .innerJoin('steps', 'steps.id', 'polylines.step_id')
          .innerJoin('plans', 'plans.id', 'steps.plan_id')
          .then((polylines) => {
              //Grabbing marker types (e.g heroes)
              knex
              .select('*')
              .from('marker_types')
              .then((markerTypes) => {
                //Grabbing plan info
                knex
                  .select("maps.url", 'plans.id', 'plans.owner_id', 'maps.type', 'plans.view_count')
                  .from("plans")
                  .where({"plans.id": req.params.id})
                  .innerJoin('maps', 'plans.map_id', 'maps.id')
                  .then((planInfo) => {
                      let isOwner = false;
                      if(planInfo[0].owner_id === req.session.userID){
                        isOwner = true;
                      }
                      //Grabbing steps & their descriptions
                      knex
                        .select("id", 'description')
                        .from("steps")
                        .where({plan_id: req.params.id})
                        .then((stepIDs) => {
                            //Setting owner true if the owner ID matches their login
                            let isOwner = false;
                            if(planInfo[0].owner_id === req.session.userID){
                              isOwner = true;
                            }

                            knex('plans')
                            .where({ id: req.params.id })
                            .update({ view_count: planInfo[0].view_count + 1 })
                            .then(()=>{
                              res.render('plan_draw', {
                                markers:markers,
                                polylines:polylines,
                                markerTypes:markerTypes,
                                isOwner: isOwner,
                                planID: planInfo[0].id,
                                username: req.session.username,
                                planID: planInfo[0].id,
                                mapURL: planInfo[0],
                                stepIDs: stepIDs,
                                planInfo: planInfo[0]
                              })
                            });
                        });
                  });
              })
          })
      })
  });



  //Showing plan view page
  router.get("/:id", (req, res) => {
      //Grabbing markers
      knex
      .select('markers.id', 'markers.step_id', 'markers.title', 'markers.description', 'markers.title', 'markers.position', 'markers.image', 'marker_types.icon_file_location', 'markers.video_URL')
      .from('steps')
      .where({plan_id:req.params.id})
      .innerJoin('plans', 'plans.id', 'steps.plan_id')
      .innerJoin('markers', 'steps.id', 'markers.step_id')
      .innerJoin('marker_types','marker_types.id', 'markers.marker_type_id')
      .then((markers) => {
          //Grabbing polylines
          knex
          .select('polylines.step_id', 'polylines.coordinates')
          .from('polylines')
          .where({'plans.id':req.params.id})
          .innerJoin('steps', 'steps.id', 'polylines.step_id')
          .innerJoin('plans', 'plans.id', 'steps.plan_id')
          .then((polylines) => {
              //Grabbing marker types (e.g heroes)
              knex
              .select('*')
              .from('marker_types')
              .then((markerTypes) => {
                //Grabbing plan info
                knex
                  .select("maps.url", 'plans.id', 'plans.owner_id', 'maps.type', 'plans.view_count')
                  .from("plans")
                  .where({"plans.id": req.params.id})
                  .innerJoin('maps', 'plans.map_id', 'maps.id')
                  .then((planInfo) => {
                      let isOwner = false;
                      if(planInfo[0].owner_id === req.session.userID){
                        isOwner = true;
                      }
                      //Grabbing steps & their descriptions
                      knex
                        .select("id", 'description')
                        .from("steps")
                        .where({plan_id: req.params.id})
                        .then((stepIDs) => {
                            //Setting owner true if the owner ID matches their login
                            let isOwner = false;
                            if(planInfo[0].owner_id === req.session.userID){
                              isOwner = true;
                            }

                            knex('plans')
                            .where({ id: req.params.id })
                            .update({ view_count: planInfo[0].view_count + 1 })
                            .then(()=>{
                              res.render('plan_view', {
                                markers:markers,
                                polylines:polylines,
                                markerTypes:markerTypes,
                                isOwner: isOwner,
                                planID: planInfo[0].id,
                                username: req.session.username,
                                planID: planInfo[0].id,
                                mapURL: planInfo[0],
                                stepIDs: stepIDs,
                                planInfo: planInfo[0]
                              })
                            });
                        });
                  });
              })
          })
      })
  });

  //Creating a new plan
  router.post("/new", (req, res) => {
    if(req.session.userID === undefined) {
      res.sendStatus(403);
    }

    knex
    .insert({name: req.body.planName, description: req.body.planDescription, owner_id: req.session.userID, map_id: Number(req.body.mapTypeID), created_datetime: moment().format("H:mm d/M/YYYY"), updated_datetime: moment().format("H:mm d/M/YYYY")})
    .into('plans')
    .returning('id')
    .then((results)=> {
      knex
      .insert({plan_id:results[0]})
      .into('steps')
      .then(()=> {
        res.sendStatus(200);
      })
    })
  });

  //Deleting a plan
  router.post("/delete/:id", (req, res) => {
      knex
      .select('owner_id')
      .from('plans')
      .where({id:req.params.id})
      .then((results) => {
        if(results[0].owner_id === req.session.userID){
          knex('plans')
          .where({ id: req.params.id })
          .del()
          .then(() => {
            knex('steps')
            .where({ plan_id: req.params.id })
            .del()
            .then(() => {
              res.sendStatus(200);
            })
          })
        }
      })
  });

  return router;
}











