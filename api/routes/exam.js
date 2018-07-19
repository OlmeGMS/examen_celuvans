'use strict'

var express = require('express');
var ExamController = require('../controllers/exam');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/exam/:id', md_auth.ensureAuth, ExamController.getExam);
api.get('/exams/:user?', md_auth.ensureAuth, ExamController.getExams);
api.get('/exams-list/', md_auth.ensureAuth, ExamController.getListExams);
api.post('/exam', md_auth.ensureAuth, ExamController.saveExam);
api.put('/exam/:id', md_auth.ensureAuth, ExamController.updateExam);
api.delete('/exam/:id', md_auth.ensureAuth, ExamController.deleteExam);


module.exports = api;
