'use strict'

var express = require('express');
var QuestionnaireController = require('../controllers/questionnaire');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/questionnaire/:id', md_auth.ensureAuth, QuestionnaireController.getQuestionnaire);
api.get('/questionnaires/:exam?', md_auth.ensureAuth, QuestionnaireController.getQuestionnaires);
api.get('/questionnaire-list/', md_auth.ensureAuth, QuestionnaireController.getListQuestionnaires);
api.post('/questionnaire', md_auth.ensureAuth, QuestionnaireController.saveQuestionnaire);
api.put('/questionnaire/:id', md_auth.ensureAuth, QuestionnaireController.updateQuestionnaire);
api.delete('/questionnaire/:id', md_auth.ensureAuth, QuestionnaireController.deleteQuestionnaire);

module.exports = api;
