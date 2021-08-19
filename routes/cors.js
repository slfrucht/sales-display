const cors = require("cors");

const whitelist = ["http://localhost:3000", "http://localhost:3001", "https://localhost:3443"];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header("Origin"));
    if(whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = {origin: true};
    } else {
        corsOptions = {origin: false};
    }
    callback(null, corsOptions);
}

exports.cors = cors(); //returns middleware function that sets header of Access-Control-Allow-Origin with wildcard
exports.corsWithOptions = cors(corsOptionsDelegate); //returns middleware function that checks if request comes from one of the whitelisted origins.
//for endpoints (eg GET) where we will accept all cross-origin requests, we will use first function
//for endpoints (eg PUT, DELETE) where we will accept only cross-origin requests from whitelisted origins, we will use second function