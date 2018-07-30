'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Question = require('../models/question');
var Exam = require('../models/exam');
var Questionnaire = require('../models/questionnaire');
var AnswerMethod = require('./answer');

function getQuestionnaire(req, res){
  var questionnaireId = req.params.id;

  Questionnaire.findById(questionnaireId).populate({ path: 'questionnaire'}).populate({path: 'question'}).populate({path: 'exam'}).exec((err, questionnaire) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!questionnaire) {
        res.status(404).send({message: 'El cuestionario no exite'});
      }else {
        res.status(200).send({questionnaire});
      }
    }
  });
}

function getQuestionnairesPages(req, res){
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }

  var itemsPerPage = 1;
  Questionnaire.find().sort('question').paginate(page, itemsPerPage, function(err, questionnaires, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!questionnaires) {
        res.status(404).send({message: 'No hay questionarios !!'});
      }else {
        return res.status(200).send({
          questionnaires: questionnaires
        });
      }
    }
  });
}

function getQuestionnaires(req, res){

  var examId = req.params.questionnaire;

  if (!examId ) {
    var find = Questionnaire.find({}).sort('questionnaire');
  }else {
    var find = Questionnaire.find({exam: examId}).sort('exam');
  }

  find.populate({path: 'exam'}).exec((err, questionnaires) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!questionnaires) {
        res.status(404).send({message: 'No hay cuestionarios'});
      }else {
        res.status(200).send({questionnaires});
      }
    }
  });
}


function getListQuestionnaires(req, res){
  var find = Questionnaire.find({}).sort('questionnaire');

  find.populate({path: 'questionnaire'}).exec((err, questionnaires) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!questionnaires) {
        res.status(404).send({message: 'No hay cuestionarios'});
      }else {
        res.status(200).send({questionnaires});
      }
    }
  });
}

function saveQuestionnaire(req, res) {
  var questionnaire = new Questionnaire();

  var respuestas = null;
  var params = req.body;
   questionnaire.exam = params.exam;
   questionnaire.question = params.question;

   questionnaire.save((err, questionnaireStored) => {
     if(err){
       res.status(500).send({message: 'Error al guardar el cuestionario'});
     }else{
       if (!questionnaireStored) {
         res.status(404).send({message: 'No se pudo guardar el cuestionario'});
       }else {
         res.status(200).send({questionnaire: questionnaireStored});
       }
     }
   });
 }

 function updateQuestionnaire(req, res){
   var questionnaireId = req.params.id;
   var update = req.body;

   Questionnaire.findByIdAndUpdate(questionnaireId, update, (err, questionnaireUpdate) => {
     if (err) {
       res.status(500).send({message: 'Error en la petición'});
     }else {
       if (!questionnaireUpdate) {
         res.status(404).send({message: 'No sea actualizado ha actualizado el cuestionario'});
       }else {
         res.status(200).send({questionnaire: questionnaireUpdate});
       }
     }
   });
 }

 function deleteQuestionnaire(req, res){
   var questionnaireId = req.params.id;

   Questionnaire.findByIdAndRemove(questionnaireId, (err, questionnaireRemoved) => {
     if (err) {
       res.status(500).send({message: 'Error en la petición'});
     }else {
       if (!questionnaireRemoved) {
         res.status(404).send({message: 'El cuestionario no ha sido eliminado'});
       }else {
         res.status(200).send({questionnaire: questionnaireRemoved});
       }
     }
   });
 }

 module.exports = {
   getQuestionnaire,
   getQuestionnaires,
   getListQuestionnaires,
   getQuestionnairesPages,
   saveQuestionnaire,
   updateQuestionnaire,
   deleteQuestionnaire
 };
