'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamSchema = Schema({
  name: String,
  user: {type: Schema.ObjectId, ref: 'User'},
  cant: String,
  intent: String
});

module.exports = mongoose.model('Exam', ExamSchema);
