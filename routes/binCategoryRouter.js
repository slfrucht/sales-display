const express = require("express");
const binCategoryRouter = express.Router();
const Order = require("../models/order");
const Deal = require("../models/deal");
const cors = require("./cors");

binCategoryRouter.route("/:primaryCategory")
.get(cors.cors, (req,res,next) => {
    let dealIdArray = [];
    Deal.find()
    .then(deals => {
        let dealArray = deals.filter(deal => {
            if(req.params.primaryCategory === "all") {
                return true;
            }
            else {
                return deal.primaryCategory === req.params.primaryCategory;
            }
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
        let roundArray = orderArray.map(order => {
            return {x : Math.round(order.x), y : Math.round(order.y)}
        })
        const orderNum = orderArray.length;
        console.log("----------orderNum = " + orderNum);
        let idCount = 0;
        let binJsonArray = [];
        for(let lng = -180; lng < 0; lng++) {
            let lngArray = roundArray.filter(order => {
                return order.x === lng;
            });
            if(lngArray.length) {
                for(let lat = 0; lat < 90; lat++) {
                    let latLngArray = roundArray.filter(order => {
                        return order.x === lng && order.y === lat;
                    });
                    if(latLngArray.length) {
                        //console.log(latLngArray.length + "entries at location: " + lat + ", " + lng);
                        let binJson = {
                            "_id": idCount.toString(),
                            "numEntries": latLngArray.length.toString(),
                            "totalEntries": orderNum.toString(),
                            "x": lng.toString(),
                            "y": lat.toString()
                        }
                        binJsonArray.push(binJson);
                        idCount++;
                    }
                }
                }
        }
        console.log("number of orders returned = ",orderArray.length);

        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(binJsonArray); //sends response, closes response stream, so res.end() not necessary
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

module.exports = binCategoryRouter;