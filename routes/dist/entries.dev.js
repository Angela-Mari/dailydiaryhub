"use strict";

var router = require('express').Router();

var Entry = require('../models/entry.model');

var sanitize = require("mongo-sanitize");

router.route('/').get(function (req, res) {
  Entry.find().then(function (entries) {
    return res.json(entries);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/add').post(function (req, res) {
  var username = sanitize(req.body.username);
  var title = sanitize(req.body.title);
  var text = sanitize(req.body.text);
  var date = Date.parse(sanitize(req.body.date));
  var newEntry = new Entry({
    username: username,
    title: title,
    text: text,
    date: date
  });
  newEntry.save().then(function () {
    return res.json('Entry added!');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/:id').get(function (req, res) {
  Entry.findById(req.params.id).then(function (entry) {
    return res.json(entry);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/:id')["delete"](function (req, res) {
  Entry.findByIdAndDelete(req.params.id).then(function () {
    return res.json('Entry deleted.');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/update/:id').post(function (req, res) {
  Entry.findById(req.params.id).then(function (entry) {
    entry.username = sanitize(req.body.username);
    entry.title = sanitize(req.body.title);
    entry.text = sanitize(req.body.text);
    entry.date = Date.parse(sanitize(req.body.date));
    entry.save().then(function () {
      return res.json('Entry updated!');
    })["catch"](function (err) {
      return res.status(400).json('Error: ' + err);
    });
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
module.exports = router;