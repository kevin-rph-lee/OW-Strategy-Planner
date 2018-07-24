"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "production";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const bcrypt      = require('bcrypt');
const cookieSession = require('cookie-session');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const markersRoutes = require("./routes/markers");
const plansRoutes = require("./routes/plans");
const polylinesRoutes = require("./routes/polylines");
const stepsRoutes = require("./routes/steps");
const _ = require('lodash');
const multer = require('multer');
var path = require('path')
const moment = require('moment');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000,
}));


// Mount all resource routes
app.use("/users", usersRoutes(knex, bcrypt, cookieSession));
app.use("/maps", mapsRoutes(knex));
app.use("/plans", plansRoutes(knex, moment));
app.use("/markers", markersRoutes(knex, multer, _, path));
app.use("/polylines", polylinesRoutes(knex));
app.use("/steps", stepsRoutes(knex));


// Home page
app.get("/", (req, res) => {
  console.log('Email passed down to EJS: ', req.session.email)
  knex
    .select('plans.id', 'plans.map_id', 'plans.description', 'maps.icon', 'plans.owner_id', 'plans.name', 'users.email', 'maps.type', 'maps.name as map_name', 'plans.created_datetime', 'plans.updated_datetime')
    .from("plans")
    .innerJoin('users', 'users.id', 'plans.owner_id')
    .innerJoin('maps', 'maps.id', 'plans.map_id')
    .then((plans) => {
      knex
        .select('*')
        .from("maps")
        .then((maps) => {
          let userID;
          if(req.session.userID === undefined){
            userID = {id:null}
          } else {
            userID = {id: req.session.userID}
          }

          res.render('index', {
            email: req.session.email,
            userID: userID,
            plans: plans,
            maps:maps
          });
        });
    });
});





app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
