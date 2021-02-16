"use strict";

var router = require('express').Router();

var User = require('../models/user.model');

var sanitize = require("mongo-sanitize");

router.route('/').get(function (req, res) {
  User.find().then(function (users) {
    return res.json(users);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/add').post(function (req, res) {
  var username = sanitize(req.body.username);
  var theme = Number(sanitize(req.body.theme));
  var newUser = new User({
    username: username,
    theme: theme
  });
  newUser.save().then(function () {
    return res.json('User added!');
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
router.route('/update/:id').post(function (req, res) {
  User.findById(sanitize(req.params.id)).then(function (user) {
    user.username = user.username;
    user.theme = Number(req.body.theme);
    user.save().then(function () {
      return res.json('User updated!');
    })["catch"](function (err) {
      return res.status(400).json('Error: ' + err);
    });
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
});
module.exports = router;