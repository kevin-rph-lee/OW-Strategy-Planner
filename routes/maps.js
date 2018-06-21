"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    knex
      .select('markers.description','markers.title','markers.position','markers.description','markers.image','markers.type','users.email', 'markers.id', 'marker_types.icon_file_location')
      .from('markers')
      .where({map_id:req.params.id})
      .innerJoin("users", "users.id", "markers.owner_id")
      .innerJoin("marker_types", "marker_types.id", "markers.marker_type_id")
      .then((markers) => {
        knex
          .select('*')
          .from('marker_types')
          .then((markerTypes) => {
            console.log('Markers ', markers)
            console.log('Marker Types ', markerTypes)
            res.render('map_view', {
              mapID: req.params.id,
              email: req.session.email,
              userID: req.session.userID,
              markers:markers,
              markerTypes: markerTypes
            });
          });
      });
  });

  return router;
}











