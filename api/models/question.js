'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = Schema({
  question: String,
  theme: { type: Schema.ObjectId, ref: 'Theme'}
});

module.exports = mongoose.model('Question', QuestionSchema);
