'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Question = require('../models/question');
var Answer = require('../models/answer');
var Exam = require('../models/exam');

function getQuestion(req, res){
    var questionId = req.params.id;

    Question.findById(questionId, (err, question) => {
      if (err) {
        res.status(500).send({message: 'Error en la petición'});
      }else{
        if(!question){
          res.status(404).send({message: 'La pregunta no exite'});
        }else {
          res.status(200).send({question});
        }
      }
    });
}

function getQuestions(req, res){
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }

  var itemsPerPage = 3;

  Question.find().sort('question').paginate(page, itemsPerPage, function(err, questions, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!questions) {
        res.status(404).send({message: 'No hay preguntas !!'});
      }else {
        return res.status(200).send({
          questions: questions
        });
      }
    }
  });
}

function getListQuestions(req, res){

  Question.find({}, function(err, questions){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!questions) {
        res.status(404).send({message: 'No hay preguntas !!'});
      }else {
        return res.status(200).send({
          questions: questions
        });
      }
    }
  });
}

function saveQuestion(req, res){
  var question = new Question();

  var params = req.body;
  question.question = params.question;
  question.theme = params.theme;

  question.save((err, questionStored) => {
    if(err){
      res.status(500).send({message: 'ERROR: No se pudo guardar la pregunta'});
    }else {
      if(!questionStored){
        res.status(404).send({message: 'La canción no ha sido guardada'});
      }else {
        res.status(200).send({question: questionStored });
      }
    }
  });
}

function updateQuestion(req, res){
  var questionId = req.params.id;
  var update = req.body;

  Question.findByIdAndUpdate(questionId, update, (err, questionUpdated) => {
    if (err) {
      res.status(500).send({message: 'Error al actualizar la pregunta'});
    }else {
      if (!questionUpdated) {
        res.status(404).send({message: 'La Pregunta no ha sido actualizada'});
      }else {
        res.status(200).send({question: questionUpdated});
      }
    }
  });
}

function deleteQuestion(req, res){
  var questionId = req.params.id;

  Question.findByIdAndRemove(questionId, (err, questionRemove) => {
    if (err) {
      res.status(500).send({message: 'Error al eliminar la pregunta'});
    }else {
      if (!questionRemove) {
        res.status(404).send({message: 'La pregunta no ha sido eliminada'});
      }else {
        //res.status(200).send({questionRemove});
        Answer.find({question: questionRemove._id}).remove((err, answerRemoved) => {
            if (err) {
              res.status(500).send({message: 'ERROR al eliminar la respuesta'});
            }else {
              if (!answerRemoved) {
                res.status(404).send({message: 'La respuesta no ha sido eliminada'});
              }else {
                Exam.find({answer: answerRemoved._id}).remove((err, examRemoved) => {
                  if (err) {

                  }else {
                    if (!answerRemoved) {
                      res.status(404).send({message: 'El examen no pudo ser eliminado'});
                    }else {
                      res.status(200).send({questionRemove});
                    }
                  }
                });
              }
            }
        });
      }
    }
  });
}


module.exports = {
  getQuestion,
  getQuestions,
  getListQuestions,
  saveQuestion,
  updateQuestion,
  deleteQuestion
};
