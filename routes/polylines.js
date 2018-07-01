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


  return router;
}











