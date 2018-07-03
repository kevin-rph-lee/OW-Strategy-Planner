"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {



  router.get("/:id", (req, res) => {

    knex
      .select('*')
      .from('polylines')
      .where({plan_id:req.params.id})
      .then((polylines) => {
        res.json(polylines);
      });

  });


  router.post("/:id/delete", (req, res) => {

    knex
      .select('owner_id')
      .from('plans')
      .where({id:req.params.id})
      .then((id) => {
        if(req.session.userID !== id[0].owner_id){
          res.sendStatus(403);
          return;
        } else {
          knex
          .select('id')
          .from('polylines')
          .where({plan_id:req.params.id})
          .then((results) => {
            for(let i = 1; i <= results.length; i++){
               knex('polylines')
                .where({ id: i })
                .del()
                .then(()=>{});
            }
            res.sendStatus(200);
          });
        }
      });
  });


  router.post("/:id", (req, res) => {

    knex
      .select('owner_id')
      .from('plans')
      .where({id:req.params.id})
      .then((results) => {
        if(req.session.userID !== results[0].owner_id){
          res.sendStatus(403);
        } else{
          const promiseArray = []
          for(let i = 0; i < req.body.polylines.length; i ++){
            const newCoordinatesArray = [];
            for(let y = 0; y < req.body.polylines[i].length; y ++){
              // console.log('Huh? ',req.body.polylines[i][y])
              newCoordinatesArray.push({lat: Number(req.body.polylines[i][y].lat), lng: Number(req.body.polylines[i][y].lng)})
            }
            promiseArray.push(
              knex
              .insert({plan_id: req.params.id, coordinates: JSON.stringify({ coordinatesArray: newCoordinatesArray}) })
              .into('polylines')
            )
          }
          Promise.all(promiseArray).then(() => {
            res.sendStatus(200);
          }).catch((err) => {
            res.sendStatus(404);
          })
        }
      });
  });

  return router;
}











