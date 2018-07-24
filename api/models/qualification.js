'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QualificationSchema = Schema({
  var idExam: { type: Schema.ObjectId, ref: 'Exam'},
  var idUser: { type: Schema.ObjectId, ref: 'User'},
  var score: String,
  var intent: String
});
