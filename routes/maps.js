"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    knex
      .select('maps.owner_id','markers.description','markers.title','markers.position','markers.description','markers.image','markers.type','users.email', 'markers.id', 'marker_types.icon_file_location')
      .from('markers')
      .where({map_id:req.params.id})
      .innerJoin('users', 'users.id', 'markers.owner_id')
      .innerJoin('marker_types', 'marker_types.id', 'markers.marker_type_id')
      .innerJoin('maps', 'maps.id', 'markers.map_id')
      .then((markers) => {
        let isOwner = false;
        if(markers[0].owner_id === req.session.userID){
          isOwner = true;
        }
        knex
          .select('*')
          .from('marker_types')
          .then((markerTypes) => {
            res.render('map_view', {
              mapID: req.params.id,
              email: req.session.email,
              userID: req.session.userID,
              markers:markers,
              markerTypes: markerTypes,
              isOwner: isOwner
            });
          });
      });
  });

  return router;
}











