"use strict";

//import basics
var express = require('express');

var cors = require('cors');

var mongoose = require('mongoose');

require('dotenv').config(); //the server and port


var app = express();
var port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); //not good coding practice probs

var uri = process.env.MONGODB_URI;
var local = process.env.REACT_APP_ATLAS_URI;
mongoose.connect(uri || local, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB connected");
});

var quotesRouter = require(__dirname + '/routes/quotes.js');

var usersRouter = require(__dirname + '/routes/users.js');

var entriesRouter = require(__dirname + '/routes/entries.js');

app.use('/quotes', quotesRouter);
app.use('/users', usersRouter);
app.use('/entries', entriesRouter); // Heroku

if (process.env.NODE_ENV === 'production') {
  app.use(express["static"]('client/build'));
} //start the server


app.listen(port, function () {
  console.log("server is running on port: ".concat(port));
});