"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, bcrypt, cookieSession) => {

  //Checks for valid email
  function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
      return (false)
  }

  router.get("/", (req, res) => {
    //Example Route
  });

  router.post("/new", (req, res) => {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    //Converting bnet ID into a format that owjs can take

    if (!(validateEmail(email))){
      return res.status(400).send('Invalid email format!');
    }
    //checking to prevent email dupes
    knex('users')
      .select("email")
      .from("users")
      .where({email:email})
      .then((results) => {
        if (results.length === 0) {
          knex
            .insert({email: email, password: bcrypt.hashSync(password, 10)})
            .into('users')
            .returning('id')
            .then((results) => {
              req.session.userID = results[0];
              req.session.email = email;
              console.log("Session email: ", req.session.email);
              res.send(results);
            });
        } else {
          res.status(400).send("Looks like you're already enrolled! Please check your email...");
        }
      });
  });


  // logs a user in
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.sendStatus(400);
      return;
    }

    // Checking if user already exists, if user does not exist, throw back a 404
    knex
      .select("password", "id")
      .from("users")
      .where({ email: email })
      .then((results) => {
        if (results.length === 0) {
          res.sendStatus(404);
        } else if (bcrypt.compareSync(password, results[0].password)) {
          req.session.email = email;
          req.session.userID = results[0].id;
          res.sendStatus(200);
        } else {
          res.sendStatus(403);
        }
      });
  });

  router.post("/new", (req, res) => {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    //Converting bnet ID into a format that owjs can take

    if (!(validateEmail(email))){
      return res.status(400).send('Invalid email format!');
    }
    //checking to prevent email dupes
    knex('users')
      .select("email")
      .from("users")
      .where({email:email})
      .then((results) => {
        if (results.length === 0) {
          knex
            .insert({email: email, password: bcrypt.hashSync(password, 10)})
            .into('users')
            .returning('id')
            .then((results) => {
              req.session.userID = results[0];
              req.session.email = email;
              console.log("Session email: ", req.session.email);
              res.send(results);
            });
        } else {
          res.status(400).send("Looks like you're already enrolled! Please check your email...");
        }
      });
  });


  router.post("/logout", (req, res) => {
    req.session = null;
    res.sendStatus(200);
  });

  return router;
}
