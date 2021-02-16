"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var quoteSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  } //   duration: { type: Number, required: true },
  //   date: { type: Date, required: true },

}, {
  timestamps: true
});
var Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;