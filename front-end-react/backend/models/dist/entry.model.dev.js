"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var entrySchema = new Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});
var Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;