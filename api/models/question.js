'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = Schema({
  question: String
});

module.exports = mongoose.model('Question', QuestionSchema);
