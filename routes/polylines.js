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

    console.log(req.body.polylines)
    res.sendStatus(200);

  });


  return router;
}











