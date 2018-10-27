"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, moment) => {

  /**
   * Updates the updated_datetime of a plan
   * @param  {[int]} planID  ID of the plan to be updated
   */
  let updateDateTime = (planID) => {
    knex('plans')
      .where({ id:planID })
      .update({ updated_datetime: moment().format("H:mm d/M/YYYY") })
      .then(()=>{});
  }

  //Grabs polylines of a particular plan
  router.get("/:id", (req, res) => {
    knex
      .select('*')
      .from('polylines')
      .where({plan_id:req.params.id})
      .then((polylines) => {
        res.json(polylines);
      });
  });

  //Deleting polylines from a plan
  router.post("/:id/delete", (req, res) => {

    knex
      .select('owner_id')
      .from('plans')
      .where({id:req.body.planID})
      .then((id) => {
        //Errors if user is not owner
        if(req.session.userID !== id[0].owner_id){
          res.sendStatus(403);
          return;
        } else {
          knex
          .select('id')
          .from('polylines')
          .where({step_id:req.params.id})
          .then((results) => {
            //Deleting polylines
            for(let i = 1; i <= results.length; i++){
               knex('polylines')
                .where({ step_id: req.params.id })
                .del()
                .then(()=>{});
            }
            updateDateTime(req.body.planID)
            res.sendStatus(200);
          });
        }
      });
  });

  //Adding polylines to a step
  router.post("/step/:id", (req, res) => {
    console.log(req.body)
    knex
      .select('owner_id')
      .from('plans')
      .where({id:req.body.planID})
      .then((results) => {
        if(req.session.userID !== results[0].owner_id){
          res.sendStatus(403);
        } else{
          //Adding the polylines to the step
          const promiseArray = []
          for(let i = 0; i < req.body.polylines.length; i ++){
            const newCoordinatesArray = [];
            for(let y = 0; y < req.body.polylines[i].length; y ++){
              newCoordinatesArray.push({lat: Number(req.body.polylines[i][y].lat), lng: Number(req.body.polylines[i][y].lng)})
            }
            promiseArray.push(
              knex
              .insert({step_id: req.params.id, coordinates: JSON.stringify({ coordinatesArray: newCoordinatesArray}) })
              .into('polylines')
            )
          }
          Promise.all(promiseArray).then(() => {
            updateDateTime(req.body.planID)
            res.sendStatus(200);
          }).catch((err) => {
            res.sendStatus(404);
          })
        }
      });
  });

  return router;
}











