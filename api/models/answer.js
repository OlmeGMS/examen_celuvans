'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = Schema({
  answer: String,
  condition: Boolean,
  question: { type: Schema.ObjectId, ref: 'Question'}
});

module.exports = mongoose.model('Answer', AnswerSchema);
