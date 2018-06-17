"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/map/:id", (req, res) => {

    knex
      .select("*")
      .from("markers")
      .where({map_id: req.params.id})
      .then((results) => {
        //WILL ALWAYS RETURN AN ARRAY
        res.json(results[0]);
      });
  });


  router.post("/map/:id/new", (req, res) => {
    if(req.session.email === undefined){
      res.sendStatus(400);
    }
    console.log("mapID ", req.params.id)
    console.log(req.body);
  });

  return router;
}
