"use strict";

var router = require('express').Router();

var Quote = require('../models/quote.model');

var sanitize = require("mongo-sanitize");

router.route('/').get(function (req, res) {
  Quote.find().then(function (quotes) {
    return res.json(quotes);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/add').post(function (req, res) {
  var username = sanitize(req.body.username);
  var text = sanitize(req.body.text);
  var author = sanitize(req.body.author); //const duration = Number(req.body.duration);
  //const date = Date.parse(req.body.date);

  var newQuote = new Quote({
    username: username,
    text: text,
    author: author // duration,
    // date,

  });
  newQuote.save().then(function () {
    return res.json('Quote added!');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/:id').get(function (req, res) {
  Quote.findById(req.params.id).then(function (quote) {
    return res.json(quote);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/:id')["delete"](function (req, res) {
  Quote.findByIdAndDelete(req.params.id).then(function () {
    return res.json('Quote deleted.');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/update/:id').post(function (req, res) {
  Quote.findById(req.params.id).then(function (quote) {
    quote.username = sanitize(req.body.username);
    quote.text = sanitize(req.body.text);
    quote.author = sanitize(req.body.author); //   exercise.duration = Number(req.body.duration);
    //   exercise.date = Date.parse(req.body.date);

    quote.save().then(function () {
      return res.json('Quote updated!');
    })["catch"](function (err) {
      return res.status(400).json('Error: ' + err);
    });
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
module.exports = router;