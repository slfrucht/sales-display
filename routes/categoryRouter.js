const express = require("express");
const categoryRouter = express.Router();
const Order = require("../models/order");
const Deal = require("../models/deal");
const cors = require("./cors");

categoryRouter.route("/:primaryCategory")
//.options(cors.corsWithOptions, (req, res) => res.sendStatus(200)) //applies to all methods on this route
.get(cors.cors, (req,res,next) => {
    let dealIdArray = [];
    Deal.find()
    .then(deals => {

        let dealArray = deals.filter(deal => {
            return deal.primaryCategory === req.params.primaryCategory;
        });
        for(deal of dealArray) {
            dealIdArray.push(deal.dealId);
        }       
    })
    .then(() => {
    Order.find()
    .then(orders => {
        let orderArray = orders.filter(order => {
            return dealIdArray.includes(order.deal_id);
        });
        console.log("number of orders returned = ",orderArray.length);
        
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(orderArray); //sends response, closes response stream, so res.end() not necessary
    })})
    .catch(err => next(err)); //lets express handle error
})
.post((req,res,next) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /orders."); //JSON content of req has been parsed and put into req.body
})
.put((req,res) => { 
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /orders."); //JSON content of req has been parsed and put into req.body
})
.delete((req,res, next) => { 
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /orders."); //JSON content of req has been parsed and put into req.body
});

module.exports = categoryRouter;