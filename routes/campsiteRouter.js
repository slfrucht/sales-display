const express = require("express");
const campsiteRouter = express.Router();
const Campsite = require("../models/campsite");

campsiteRouter.route("/")

.get((req,res,next) => {
    Campsite.find()
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(campsites); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res,next) => { //assume data is JSON
    Campsite.create(req.body)
    .then(campsite => {
        console.log("Campsite created: ", campsite);
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(campsite); //sends response, closes response stream, so res.end() not necessary
     })
     .catch(err => next(err)); //lets express handle error
})
.put((req,res) => { 
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /campsites."); //JSON content of req has been parsed and put into req.body
})
.delete((req,res, next) => { 
    Campsite.deleteMany()  //if no parameters sent, delets all
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error

});


campsiteRouter.route("/:campsiteId")
.get((req,res,next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(campsite); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /campsites/${req.params.campsiteId}.`); 
})
.put((req,res,next) => { 
    Campsite.findByIdAndUpdate(req.params.campsiteId,
        {$set: req.body},
        {new: true })
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(campsite); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.delete((req,res,next) => { 
    Campsite.findByIdAndDelete(req.params.campsiteId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
});



module.exports = campsiteRouter;