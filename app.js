var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require("mongoose");
const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dealRouter = require('./routes/dealRouter');
const orderRouter = require('./routes/orderRouter');
const categoryRouter = require('./routes/categoryRouter');
const url = "mongodb://localhost:27017/salesdisplay_db";


///*
(async () => {
  // code goes here
  const mongooseClient = await mongooseConnect(url); //this one is for connecting to endpoints
  const client = await mongoConnect(url); // this is for reading and converting csv files
//fill deals collection
  await deleteData(client, "deals");
  const dealsData = await csvToJson("./csv_files/deals.csv");
  await createData(client, dealsData, "deals");
//fill orders collection
  await deleteData(client, "orders");
  const ordersData = await csvToJson("./csv_files/orders_filtered.csv");
  await createData(client, ordersData, "orders");
})();

//const mongoose = require("mongoose");
/*
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
*/

//connect.then(() => {console.log("Connected to server.");}
//, err => console.log(err)); //another way of catching error

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/deals', dealRouter);
app.use('/orders', orderRouter);
app.use('/categories', categoryRouter);

app.all("*", (req, res, next) => {
  if(req.secure) {
    return next();
  } else {
    console.log(`Redirecting to: https://${req.hostname}:${app.get("secPort")}${req.url}`);
    res.redirect(301, `https://${req.hostname}:${app.get("secPort")}${req.url}`)
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

async function csvToJson(filePath) {
  return csvtojson().fromFile(filePath);  //returns promise
}
async function deleteData(client, collection) {
  return client.db("salesdisplay_db")
  .collection(collection)
  .deleteMany();
}
async function createData(client, csvDealsData, collection) {
  return client.db("salesdisplay_db")
  .collection(collection)
  .insertMany(csvDealsData);
}
async function mongoConnect(url) {
  return mongodb.connect(url,
    {useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
} 
async function mongooseConnect(url) {
  return mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

