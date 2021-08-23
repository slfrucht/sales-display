const express = require("express");
const dealRouter = express.Router();
const Deal = require("../models/deal");
const cors = require("./cors");

dealRouter.route("/")
.get(cors.cors, (req,res,next) => {
    Deal.find()
    .then(deals => {
        console.log("number of deals returned = ",deals.length);
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(deals); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res,next) => { //assume data is JSON
    Deal.create(req.body)
    .then(deal => {
        console.log("Partner created: ", deal);
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(deal); //sends response, closes response stream, so res.end() not necessary
     })
     .catch(err => next(err)); //lets express handle error
})
.put((req,res) => { 
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /deals."); //JSON content of req has been parsed and put into req.body
})
.delete((req,res, next) => { 
    Deal.deleteMany()  //if no parameters sent, delets all
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error

});


dealRouter.route("/:assignedDealId")
.get((req,res,next) => {
    Deal.findById(req.params.assignedDealId)
    .then(deal => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(deal); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /deal/${req.params.assignedDealId}.`); 
})
.put((req,res,next) => { 
    Deal.findByIdAndUpdate(req.params.assignedDealId,
        {$set: req.body},
        {new: true })
    .then(deal => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(deal); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.delete((req,res,next) => { 
    Deal.findByIdAndDelete(req.params.assignedDealId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
});

dealRouter.route("/title/:titleName")
.get((req,res,next) => {
    Deal.find({title: req.params.titleName})
    .then(deals => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(deals); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /deal/${req.params.assignedDealId}.`); 
})
.put((req,res,next) => { 
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /deal/${req.params.assignedDealId}.`); 
})
.delete((req,res,next) => { 
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /deal/${req.params.assignedDealId}.`); 
});

dealRouter.route("/categories/:primaryCategory")
.get((req,res,next) => {
    Deal.find({primaryCategory: req.params.primaryCategory})
    //Deal.find({title: "Handbags"}) 
    .then(deals => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(deals); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /deal/${req.params.assignedDealId}.`); 
})
.put((req,res,next) => { 
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /deal/${req.params.assignedDealId}.`); 
})
.delete((req,res,next) => { 
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /deal/${req.params.assignedDealId}.`); 
});

module.exports = dealRouter;