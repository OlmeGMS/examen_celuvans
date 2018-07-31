'use strict'

var express = require('express');
var QualificationController = require('../controllers/qualification');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/qualification/:id', md_auth.ensureAuth, QualificationController.getQualification);
api.get('/qualifications/:user?', md_auth.ensureAuth, QualificationController.getQualifications);
api.get('/qualifications-exam/:exam?', md_auth.ensureAuth, QualificationController.getQualificationsExam);
api.get('/qualifications-exam-approved/:exam?', md_auth.ensureAuth, QualificationController.getQualificationsExamApproved);
api.get('/qualifications-exam-reprobate/:exam?', md_auth.ensureAuth, QualificationController.getQualificationsExamReprobate);
api.get('/qualification-list', md_auth.ensureAuth, QualificationController.getListQualifications);
api.post('/qualification', md_auth.ensureAuth, QualificationController.saveQualification);
api.put('/qualification/:id', md_auth.ensureAuth, QualificationController.updateQualification);
api.delete('/qualification/:id', md_auth.ensureAuth, QualificationController.deleteQualification);

module.exports = api;
