"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, multer, _, path, moment) => {


  /**
   * Updates the updated_datetime of a plan
   * @param  {[int]} planID  ID of the plan to be updated
   */
  let updateDateTime = (planID) => {
    knex('plans')
      .where({ id:planID })
      .update({ updated_datetime: moment().format("H:mm d/M/YYYY") })
      .then(()=>{});
  }


  /**
   * Gets the youtube ID from a youtube URL
   * @param  {[STRING]} url youtube URL
   * @return {[STRING]}     youtube ID
   */
  let getYoutubeID = (url) => {
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
        res.json(results[0]);
      });
  });


  //adds a new marker to the plan
  router.post('/step/:id/new', (req, res) => {
    //Checking if user is signed in
    if(req.session.username === undefined){
      res.sendStatus(400);
      return;
    }

    knex
      .select('id')
      .from('users')
      .where({username:req.session.username})
      .then((results) => {
        //Checking if there is a URL embed
        if(req.body.videoURL !== undefined) {

          //Seeing if youtube URL is valid
          try{
            getYoutubeID(req.body.videoURL);
          } catch(err){
            return res.status(400).send('Invalid youtube URL format!');
          }

          //Inserting new marker
          knex
          .insert({step_id:req.params.id, owner_id: results[0].id, position:{lat:Number(req.body.position.lat), lng:Number(req.body.position.lng)}, video_URL: getYoutubeID(req.body.videoURL), title: req.body.markerName, description:req.body.markerDescription, marker_type_id:req.body.markerTypeID, image: false})
          .into('markers')
          .returning('id')
          .then((results) => {
            res.send(results);
          });
        } else{
          //Inserting new marker
          knex
          .insert({step_id:req.params.id, owner_id: results[0].id, position:{lat:Number(req.body.position.lat), lng:Number(req.body.position.lng)}, title: req.body.markerName, description:req.body.markerDescription, marker_type_id:req.body.markerTypeID, image: false})
          .into('markers')
          .returning('id')
          .then((results) => {
            updateDateTime(req.body.planID)
            res.send(results);
          });
        }
      });
  });


  //Deleting a marker
  router.post('/delete/:id', (req, res) => {
    if(req.session.username === undefined){
      res.sendStatus(400);
    }
    knex('markers')
    .where({ id: req.params.id })
    .del()
    .then(() => {
      updateDateTime(req.body.planID)
      res.sendStatus(200);
    })

  });


  //Recieving a new image file
  router.post("/:id/image", (req, res) => {

    if(!req.session.userID){
      res.sendStatus(403);
    }

    const storage = multer.diskStorage({
      destination: function(req, file, callback) {
        callback(null, './public/images/')
      },
      //Naming the filename as the marker id number
      filename: function(req, file, callback) {
        callback(null, req.params.id + path.extname(file.originalname))
      }
    })

    const upload = multer({
      storage: storage,
      fileFilter: function(req, file, callback) {

        const ext = path.extname(file.originalname)
        //Ensuring file is a jpg file
        if (ext !== '.jpg') {
          knex('markers')
            .where({ id: req.params.id })
            .del()
            .then(() => {})

          res.sendStatus(400);
          return;
        }
        callback(null, true)
      }
    }).single('userFile');
    upload(req, res, function(err) {
      //Marking the marker as having an image
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
