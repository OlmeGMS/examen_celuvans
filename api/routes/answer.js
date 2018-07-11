'use strict'

var express = require('express');
var AnswerController = require('../controllers/answer');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/answer/:id', md_auth.ensureAuth, AnswerController.getAnswer);
api.get('/answers/:question?', md_auth.ensureAuth, AnswerController.getAnswers);
api.post('/answer', md_auth.ensureAuth, AnswerController.saveAnswer);
api.put('/answer/:id', md_auth.ensureAuth, AnswerController.updateAnswer);
api.delete('/answer/:id', md_auth.ensureAuth, AnswerController.deleteAnswer);


module.exports = api;
