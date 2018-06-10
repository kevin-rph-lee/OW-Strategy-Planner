"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    res.render('map_view', {
      email: req.session.email,
      userID: req.session.userID
    });
  });


  return router;
}
