'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QualificationSchema = Schema({
  exam: { type: Schema.ObjectId, ref: 'Exam'},
  user: { type: Schema.ObjectId, ref: 'User'},
  score: String,
  intent: String
});
