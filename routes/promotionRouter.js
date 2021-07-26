const express = require("express");
const promotionRouter = express.Router();

promotionRouter.route("/")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Typer", "text/plain");
    next(); //go to next relevent request - if post request, the app.get() will be ignored
})
.get((req,res) => {
    res.end("Will send promotion info to you."); //no need to set status code or header, because already set in app.all()
})
.post((req,res) => { //assume data is JSON
    res.end(`Will add promotion: ${req.body.name} with description: ${req.body.description} `); //JSON content of req has been parsed and put into req.body
})
.put((req,res) => { 
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /promotions."); //JSON content of req has been parsed and put into req.body
})
.delete((req,res) => { 
    res.end("Deleting all promotions."); //in future, need to use authentication to check if user is allowed to perform that operation
});


promotionRouter.route("/:promotionId")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Typer", "text/plain");
    next(); //go to next relevent request - if post request, the app.get() will be ignored
})
.get((req,res) => {
    res.end(`Will send details of promotion ${req.params.promotionId} to you.`);
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /promotions/${req.params.promotionId}.`); 
})
.put((req,res) => { 
    res.write(`Updating the promotion: ${req.params.promotionId}\n`); 
    res.end(`with description: ${req.body.description}.`); 
})
.delete((req,res) => { 
    res.end(`Deleting promotion: ${req.params.promotionId}.`); 
});



module.exports = promotionRouter;