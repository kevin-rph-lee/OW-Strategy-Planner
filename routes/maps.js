"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

    router.get("/", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .then((results) => {
          res.json(results);
        });
    });

    //Get all control maps
    router.get("/control", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'Control'})
        .then((results) => {
          res.json(results);
        });
    });


    //Get all control maps
    router.get("/assault", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'Assault'})
        .then((results) => {
          res.json(results);
        });
    });

    //Get all escort maps
    router.get("/escort", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'Escort'})
        .then((results) => {
          res.json(results);
        });
    });

    //Get all hybrid maps
    router.get("/hybrid", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'Hybrid'})
        .then((results) => {
          res.json(results);
        });
    });

  return router;
}











