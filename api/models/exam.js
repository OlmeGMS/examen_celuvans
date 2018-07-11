'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamSchema = Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  question: {type: Schema.ObjectId, ref: 'Question'},
  answer: {type: Schema.ObjectId, ref: 'Answer'},
  qualification: String
});

module.exports = mongoose.model('Exam', ExamSchema);
