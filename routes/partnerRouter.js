const express = require("express");
const partnerRouter = express.Router();

partnerRouter.route("/")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Typer", "text/plain");
    next(); //go to next relevent request - if post request, the app.get() will be ignored
})
.get((req,res) => {
    res.end("Will send partner info to you."); //no need to set status code or header, because already set in app.all()
})
.post((req,res) => { //assume data is JSON
    res.end(`Will add partner: ${req.body.name} with description: ${req.body.description} `); //JSON content of req has been parsed and put into req.body
})
.put((req,res) => { 
    res.statusCode = 403; //operation not supported
    res.end("PUT operation not supported on /partners."); //JSON content of req has been parsed and put into req.body
})
.delete((req,res) => { 
    res.end("Deleting all partners."); //in future, need to use authentication to check if user is allowed to perform that operation
});


partnerRouter.route("/:partnerId")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Typer", "text/plain");
    next(); //go to next relevent request - if post request, the app.get() will be ignored
})
.get((req,res) => {
    res.end(`Will send details of partner ${req.params.partnerId} to you.`);
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403; //operation not supported
    res.end(`POST not supported on  /partners/${req.params.partnerId}.`); 
})
.put((req,res) => { 
    res.write(`Updating the partner: ${req.params.partnerId}\n`); 
    res.end(`with description: ${req.body.description}.`); 
})
.delete((req,res) => { 
    res.end(`Deleting partner: ${req.params.partnerId}.`); 
});



module.exports = partnerRouter;