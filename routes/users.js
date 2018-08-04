"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, bcrypt, cookieSession) => {

  /**
   * Checks a string for special characters. Returns false if one is found
   * @param  {string} string string to be checked
   * @return {boolean}        returns true if invalid characters found
   */
  function checkInvalidCharacters(string) {
    return !(/^[a-zA-Z0-9-#]*$/.test(string));
  }

  //Checks for valid email
  // function validateEmail(mail) {
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
  //     return (true)
  //   }
  //     return (false)
  // }

  router.post("/new", (req, res) => {
    const username = req.body.username.trim().toLowerCase();
    const password = req.body.password;
    //Converting bnet ID into a format that owjs can take


    if(checkInvalidCharacters(username) || checkInvalidCharacters(password)){
      return res.status(400).send('Invalid characters in username or password')
    }

    //checking to prevent email dupes
    knex('users')
      .select("username")
      .from("users")
      .where({username:username})
      .then((results) => {
        if (results.length === 0) {
          knex
            .insert({username: username, password: bcrypt.hashSync(password, 10)})
            .into('users')
            .returning('id')
            .then((results) => {
              req.session.userID = results[0];
              req.session.username = username;
              res.send(results);
            });
        } else {
          res.status(400).send('Username already being used');
        }
      });
  });


  // logs a user in
  router.post("/login", (req, res) => {
    const username = req.body.username.trim().toLowerCase();
    const password = req.body.password;
    if (!username || !password) {
      res.status(400).send('Username or password empty!');
      return;
    }

    // Checking if user already exists, if user does not exist, throw back a 404
    knex
      .select("password", "id")
      .from("users")
      .where({ username: username })
      .then((results) => {
        console.log('results: ', results)
        if (results.length === 0 || checkInvalidCharacters(username)) {
          return res.status(404).send('Username not found!');
        } else if (bcrypt.compareSync(password, results[0].password)) {
          req.session.username = username;
          req.session.userID = results[0].id;
          return res.sendStatus(200);
        } else {
          return res.status(403).send('Password incorrect!');
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
