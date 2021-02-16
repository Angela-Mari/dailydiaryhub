"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  theme: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
var User = mongoose.model('User', userSchema);
module.exports = User;