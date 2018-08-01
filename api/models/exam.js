'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamSchema = Schema({
  name: String,
  user: {type: Schema.ObjectId, ref: 'User'},
  cant: String,
  intent: String,
  theme : { type: Schema.ObjectId, ref: 'Theme'}
});

module.exports = mongoose.model('Exam', ExamSchema);
