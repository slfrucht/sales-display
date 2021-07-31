const express = require("express");
const promotionRouter = express.Router();
const Promotion = require("../models/promotion");

promotionRouter.route("/")
.get((req,res,next) => {
    Promotion.find()
    .then(promotions => {
        console.log("number of promotions returned = ",promotions.length);
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(promotions); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res,next) => { //assume data is JSON
    Promotion.create(req.body)
    .then(promotion => {
        console.log("Promotion created: ", promotion);
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(promotion); //sends response, closes response stream, so res.end() not necessary
     })
     .catch(err => next(err)); //lets express handle error
})
.put((req,res) => { 
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /promotions."); //JSON content of req has been parsed and put into req.body
})
.delete((req,res, next) => { 
    Promotion.deleteMany()  //if no parameters sent, delets all
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error

});


promotionRouter.route("/:promotionId")
.get((req,res,next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(promotion); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /partners/${req.params.partnerId}.`); 
})
.put((req,res,next) => { 
    Promotion.findByIdAndUpdate(req.params.promotionId,
        {$set: req.body},
        {new: true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(promotion); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.delete((req,res,next) => { 
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
});

module.exports = promotionRouter;