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
      .select('markers.step_id', 'markers.title', 'markers.description', 'markers.title', 'markers.position', 'markers.image', 'markers.type', 'markers.id')
      .from('steps')
      .where({plan_id:req.params.id})
      .innerJoin('plans', 'plans.id', 'steps.plan_id')
      .innerJoin('markers', 'steps.id', 'markers.step_id')
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
              .then((marker_types) => {
                knex
                .select('owner_id')
                .from('plans')
                .then((ownerID) => {
                  let isOwner = false;
                  if(req.session.userID === ownerID[0].owner_id){
                    isOwner = true;
                  }

                  res.json({
                    markers:markers,
                    polylines:polylines,
                    marker_types:marker_types,
                    isOwner: isOwner
                  })
                })
              })



          })

      })
  });

  // router.get("/:id", (req, res) => {
  //   knex
  //     .select('plans.name', 'plans.owner_id','markers.description','markers.title','markers.position','markers.description','markers.image','markers.type','users.email', 'markers.id', 'marker_types.icon_file_location', 'maps.url')
  //     .from('markers')
  //     .where({plan_id:req.params.id})
  //     .innerJoin('users', 'users.id', 'markers.owner_id')
  //     .innerJoin('marker_types', 'marker_types.id', 'markers.marker_type_id')
  //     .innerJoin('plans', 'plans.id', 'markers.plan_id')
  //     .innerJoin('maps', 'plans.map_id', 'maps.id')
  //     .then((markers) => {
  //       let isOwner = false;
  //       if(markers[0].owner_id === req.session.userID){
  //         isOwner = true;
  //       }

  //       knex
  //         .select('*')
  //         .from('marker_types')
  //         .then((markerTypes) => {
  //           res.render('plan_view', {
  //             planID: req.params.id,
  //             email: req.session.email,
  //             userID: req.session.userID,
  //             markers:markers,
  //             markerTypes: markerTypes,
  //             isOwner: isOwner
  //           });
  //         });
  //     });
  // });

  return router;
}











