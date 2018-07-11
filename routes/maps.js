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
        .where({type: 'control'})
        .then((results) => {
          //WILL ALWAYS RETURN AN ARRAY
          res.json(results);
        });
    });



    router.get("/assault", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'assault'})
        .then((results) => {
          //WILL ALWAYS RETURN AN ARRAY
          res.json(results);
        });
    });

    router.get("/escort", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'escort'})
        .then((results) => {
          //WILL ALWAYS RETURN AN ARRAY
          res.json(results);
        });
    });

    router.get("/hybrid", (req, res) => {

      knex
        .select("*")
        .from("maps")
        .where({type: 'hybrid'})
        .then((results) => {
          //WILL ALWAYS RETURN AN ARRAY
          res.json(results);
        });
    });

  return router;
}











