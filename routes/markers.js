"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, multer, _, path) => {

  /**
   * Gets the youtube ID from a youtube URL
   * @param  {[STRING]} url youtube URL
   * @return {[STRING]}     youtube ID
   */
  function getYoutubeID(url){
    //TO DO - get a better function
    const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

    return (url.match(VID_REGEX)[1]);
  }

  router.get("/plan/:id", (req, res) => {

    knex
      .select("*")
      .from("markers")
      .where({plan_id: req.params.id})
      .then((results) => {
        //WILL ALWAYS RETURN AN ARRAY
        res.json(results[0]);
      });
  });


  router.post('/step/:id/new', (req, res) => {
    if(req.session.email === undefined){
      res.sendStatus(400);
    }

    knex
      .select('id')
      .from('users')
      .where({email:req.session.email})
      .then((results) => {

        if(req.body.videoURL !== undefined) {

          try{
            getYoutubeID(req.body.videoURL);
          } catch(err){
            return res.status(400).send('Invalid youtube URL format!');
          }

          knex
          .insert({step_id:req.params.id, owner_id: results[0].id, position:{lat:Number(req.body.position.lat), lng:Number(req.body.position.lng)}, video_URL: getYoutubeID(req.body.videoURL), title: req.body.markerName, description:req.body.markerDescription, marker_type_id:req.body.markerTypeID, image: false})
          .into('markers')
          .returning('id')
          .then((results) => {
            res.send(results);
          });
        } else{
          knex
          .insert({step_id:req.params.id, owner_id: results[0].id, position:{lat:Number(req.body.position.lat), lng:Number(req.body.position.lng)}, title: req.body.markerName, description:req.body.markerDescription, marker_type_id:req.body.markerTypeID, image: false})
          .into('markers')
          .returning('id')
          .then((results) => {
            res.send(results);
          });
        }
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
      .from('plans')
      .where({id:req.body.planID})
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
        if (ext !== '.jpg') {
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
