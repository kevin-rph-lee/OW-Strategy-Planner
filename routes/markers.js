"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, multer, _, path) => {

  router.get("/map/:id", (req, res) => {

    knex
      .select("*")
      .from("markers")
      .where({map_id: req.params.id})
      .then((results) => {
        //WILL ALWAYS RETURN AN ARRAY
        res.json(results[0]);
      });
  });


  router.post("/map/:id/new", (req, res) => {
    if(req.session.email === undefined){
      res.sendStatus(400);
    }
    console.log("mapID ", req.params.id)
    console.log(req.body);
    knex
    .insert({name: req.session.email, password: bcrypt.hashSync(password, 10), battlenet_id: battlenetID, avatar: results.profile.avatar})
    .into('markers')
    .returning('id')
    .then((results) => {
      res.send(results);
    });
  });


  router.post("/:id/image", (req, res) => {

    if(!req.session.userID){
      res.sendStatus(403);
    }

    const storage = multer.diskStorage({
      destination: function(req, file, callback) {
        callback(null, './public/images/')
      },
      filename: function(req, file, callback) {
        callback(null, req.params.id + path.extname(file.originalname))
      }
    })

    const upload = multer({
      storage: storage,
      fileFilter: function(req, file, callback) {
        //Only allowing png, jpg, gif, jpeg
        const ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          res.sendStatus(400);
          return;
        }
        callback(null, true)
      }
    }).single('userFile');
    upload(req, res, function(err) {
      res.sendStatus(200);
    })

  });

  return router;
}
