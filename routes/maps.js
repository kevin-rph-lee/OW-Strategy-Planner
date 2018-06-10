"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    knex
      .select('markers.description','markers.title','markers.position','markers.description','markers.image','markers.type','users.email', 'markers.id')
      .from('markers')
      .where({map_id:req.params.id})
      .innerJoin("users", "users.id", "markers.owner_id")
      .then((results) => {
        console.log('markers: ', results);
        res.render('map_view', {
          email: req.session.email,
          userID: req.session.userID,
          markers:results
        });
      });
  });

  return router;
}
