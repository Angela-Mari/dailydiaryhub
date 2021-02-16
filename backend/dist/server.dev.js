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

var uri = process.env.REACT_APP_ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB connected");
});

var quotesRouter = require('./routes/quotes');

var usersRouter = require('./routes/users');

var entriesRouter = require('./routes/entries');

app.use('/quotes', quotesRouter);
app.use('/users', usersRouter);
app.use('/entries', entriesRouter); //start the server

app.listen(port, function () {
  console.log("server is running on port: ".concat(port));
});