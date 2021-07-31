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

campsiteRouter.route("/:campsiteId/comments")
.get((req,res,next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite) { //why do we have to check for this - wouldn't we get an error of campsite was null?
            res.statusCode = 200;
            res.setHeader("Content-Type","application/json");
            res.json(campsite.comments); //sends response, closes response stream, so res.end() not necessary
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite && campsite.comments) {
            campsite.comments.push(req.body);
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found or comments isn't an array`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

.put((req,res) => { 
    res.statusCode = 403; //operation not supported
    res.end(`Put operaion not supported on /campsites/${req.params.campsiteId}/comments`); //JSON content of req has been parsed and put into req.body
})
.delete((req,res, next) => { 
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite) { //why do we have to check for this - wouldn't we get an error of campsite was null?
            for(let i = campsite.comments.length - 1;i >= 0; i--) {
                campsite.comments.id(campsite.comments[i]._id).remove();
            }
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json");
                res.json(campsite); //sends response, closes response stream, so res.end() not necessary
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err)); //lets express handle error

});

campsiteRouter.route("/:campsiteId/comments/:commentId")
.get((req,res,next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite && campsite.comments.id(req.params.commentId)) { //why do we have to check for this - wouldn't we get an error of campsite was null?
            res.statusCode = 200;
            res.setHeader("Content-Type","application/json");
            res.json(campsite.comments.id(req.params.commentId)); //sends response, closes response stream, so res.end() not necessary
        } else if(!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err)); //lets express handle error
})
.post((req,res) => { //assume data is JSON
    res.statusCode = 403;
    res.end(`Post operaion not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`); //JSON content of req has been parsed and put into req.body
})
.put((req,res, next) => { 
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite && campsite.comments.id(req.params.commentId)) { //why do we have to check for this - wouldn't we get an error of campsite was null?
            if(req.body.rating) {
                campsite.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if(req.body.text) {
                campsite.comments.id(req.params.commentId).text = req.body.text;
            }
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json");
                res.json(campsite); //sends response, closes response stream, so res.end() not necessary
            })
            .catch(err => next(err));
        } else if(!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err)); //lets express handle error
})
.delete((req,res, next) => { 
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite && campsite.comments.id(req.params.commentId)) { //why do we have to check for this - wouldn't we get an error of campsite was null?
            campsite.comments.id(req.params.commentId).remove();
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json");
                res.json(campsite); //sends response, closes response stream, so res.end() not necessary
            })
            .catch(err => next(err));
        } else if(!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err)); //lets express handle error

});


module.exports = campsiteRouter;