"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
    router.get("/", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .then((results) => {
          //WILL ALWAYS RETURN AN ARRAY
          res.json(results);
        });
    });


    router.get("/control", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'Control'})
        .then((results) => {
          //WILL ALWAYS RETURN AN ARRAY
          res.json(results);
        });
    });



    router.get("/assault", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'Assault'})
        .then((results) => {
          //WILL ALWAYS RETURN AN ARRAY
          res.json(results);
        });
    });

    router.get("/escort", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'Escort'})
        .then((results) => {
          //WILL ALWAYS RETURN AN ARRAY
          res.json(results);
        });
    });

    router.get("/hybrid", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'Hybrid'})
        .then((results) => {
          //WILL ALWAYS RETURN AN ARRAY
          res.json(results);
        });
    });

  return router;
}











