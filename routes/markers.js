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


  return router;
}
