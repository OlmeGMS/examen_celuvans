'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var QuestionnaireSchema = Schema({
  exam: { type: Schema.ObjectId, ref: 'Exam'},
  question: [ { type: Schema.ObjectId, ref: 'Question'} ]

  /*questions: [{
    question: { type: Schema.ObjectId, ref: 'Question'}
  }]*/

});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
