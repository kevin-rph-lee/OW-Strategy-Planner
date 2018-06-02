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
          console.log('Ready to insert');
          //stuff tha relies on it
        } else {
          res.status(400).send("Looks like you're already enrolled! Please check your email...");
        }
      });
  });


  return router;
}
