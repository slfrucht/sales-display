const express = require("express");
const orderRouter = express.Router();
const Order = require("../models/order");

orderRouter.route("/")
.get((req,res,next) => {
    Order.find()
    .then(orders => {
        console.log("number of orders returned = ",orders.length);
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(orders); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res,next) => { //assume data is JSON
    Order.create(req.body)
    .then(order => {
        console.log("Partner created: ", order);
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(order); //sends response, closes response stream, so res.end() not necessary
     })
     .catch(err => next(err)); //lets express handle error
})
.put((req,res) => { 
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /orders."); //JSON content of req has been parsed and put into req.body
})
.delete((req,res, next) => { 
    Order.deleteMany()  //if no parameters sent, delets all
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error

});


orderRouter.route("/:assignedOrderId")
.get((req,res,next) => {
    Order.findById(req.params.assignedOrderId)
    .then(order => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(order); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /orders/${req.params.assignedOrderId}.`); 
})
.put((req,res,next) => { 
    Order.findByIdAndUpdate(req.params.assignedOrderId,
        {$set: req.body},
        {new: true })
    .then(order => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(order); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
})
.delete((req,res,next) => { 
    Order.findByIdAndDelete(req.params.assignedOrderId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(response); //sends response, closes response stream, so res.end() not necessary
    })
    .catch(err => next(err)); //lets express handle error
});

module.exports = orderRouter;