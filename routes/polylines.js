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
        console.log(polylines);
        res.json(polylines);
      });

  });


  router.post("/:id", (req, res) => {
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



  });


  return router;
}











