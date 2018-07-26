'use strict'

var express = require('express');
var QuestionController = require('../controllers/question');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/question/:id', md_auth.ensureAuth, QuestionController.getQuestion);
api.get('/questions/:page?', md_auth.ensureAuth, QuestionController.getQuestions);
api.get('/questions-theme/:theme?', md_auth.ensureAuth, QuestionController.getQuestionsForTheme);
api.get('/questions-list/', md_auth.ensureAuth, QuestionController.getListQuestions);
api.post('/question/', md_auth.ensureAuth, QuestionController.saveQuestion);
api.put('/question/:id', md_auth.ensureAuth, QuestionController.updateQuestion);
api.delete('/question/:id', md_auth.ensureAuth, QuestionController.deleteQuestion);


module.exports = api;
