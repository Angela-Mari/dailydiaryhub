const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
//   duration: { type: Number, required: true },
//   date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;