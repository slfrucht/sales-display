const express = require("express");
const partnerRouter = express.Router();
const Partner = require("../models/partner");

partnerRouter.route("/")
.get((req,res,next) => {
    Partner.find()
    .then(partners => {
        console.log("number of partners returned = ",partners.length);
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(partners); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res,next) => { //assume data is JSON
    Partner.create(req.body)
    .then(partner => {
        console.log("Partner created: ", partner);
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(partner); //sends response, closes response stream, so res.end() not necessary
     })
     .catch(err => next(err)); //lets express handle error
})
.put((req,res) => { 
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /partners."); //JSON content of req has been parsed and put into req.body
})
.delete((req,res, next) => { 
    Partner.deleteMany()  //if no parameters sent, delets all
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error

});


partnerRouter.route("/:partnerId")
.get((req,res,next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(partner); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /partners/${req.params.partnerId}.`); 
})
.put((req,res,next) => { 
    Partner.findByIdAndUpdate(req.params.partnerId,
        {$set: req.body},
        {new: true })
    .then(partner => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(partner); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.delete((req,res,next) => { 
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
});


module.exports = partnerRouter;