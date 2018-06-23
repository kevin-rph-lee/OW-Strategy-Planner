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


  router.post('/map/:id/new', (req, res) => {
    if(req.session.email === undefined){
      res.sendStatus(400);
    }

    knex
      .select('id')
      .from('users')
      .where({email:req.session.email})
      .then((results) => {
        knex
        .insert({map_id:req.params.id, owner_id: results[0].id, position:{lat:Number(req.body.position.lat), lng:Number(req.body.position.lng)}, title: req.body.markerName, description:req.body.markerDescription, marker_type_id:req.body.markerTypeID, image: false})
        .into('markers')
        .returning('id')
        .then((results) => {
          res.send(results);
        });
      });
  });


  //Deleting a marker
  router.post('/delete/:id', (req, res) => {
    if(req.session.email === undefined){
      res.sendStatus(400);
    }

    //Check if the user who is logged in is the actual owner
    knex
      .select('owner_id')
      .from('maps')
      .where({id:req.body.mapID})
      .then((results) => {
        if(results[0].owner_id === req.session.userID){
          //Delete the marker
          knex('markers')
          .where({ id: req.params.id })
          .del()
          .then(() => {
            res.sendStatus(200);
          })
        } else {
          res.sendStatus(403);
        }
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
      knex('markers')
        .where({ id:req.params.id })
        .update({ image:true })
        .then(()=>{
          res.sendStatus(200);
        });
    })

  });

  return router;
}
