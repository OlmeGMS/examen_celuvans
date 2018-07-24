'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionnaireSchema = Schema({
  idExam: { type: Schema.ObjectId, ref: 'Exam'},
  idQuestion: { type: Schema.ObjectId, ref: 'Question'}
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
