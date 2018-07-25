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

  router.post("/plan/:id/new", (req, res) => {
    knex
    .select('owner_id')
    .from('plans')
    .where({id:req.params.id})
    .then((results) => {
      if(req.session.userID === results[0].owner_id){
        knex
        .insert({plan_id:req.params.id})
        .into('steps')
        .then(()=> {
          updateDateTime(req.params.id);
          res.sendStatus(200);
        })
      }
    })

  });


  router.post("/delete/:id", (req, res) => {
    knex
    .select('owner_id')
    .from('plans')
    .where({id:req.body.planID})
    .then((results) => {
      if(req.session.userID === results[0].owner_id){
        knex('steps')
        .where({ id: req.params.id })
        .del()
        .then(() => {
          updateDateTime(req.params.id);
          res.sendStatus(200);
        })
      }
    })
  });

  return router;
}











