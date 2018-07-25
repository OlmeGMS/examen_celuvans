'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QualificationSchema = Schema({
  var exam: { type: Schema.ObjectId, ref: 'Exam'},
  var user: { type: Schema.ObjectId, ref: 'User'},
  var score: String,
  var intent: String
});
