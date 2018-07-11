'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Question = require('../models/question');
var Answer = require('../models/answer');
var Exam = require('../models/exam');

function getAnswer(req, res){
  var answerId = req.params.id;
  Answer.findById(answerId).populate({path: 'question'}).exec((err, answer) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!answer) {
        res.status(404).send({message: 'La pregunta no existe'});
      }else {
        res.status(200).send({answer});
      }
    }
  });
}

function getAnswers(req, res){
  var questionId = req.params.question;

  if (!questionId) {
    //Sacar todas las respuestas de la BD
    var find = Answer.find({}).sort('answer');
  }else {
    //Sacar las respuesta de una pregunta  de la BD
    var find = Answer.find({question: questionId}).sort('question');
  }

  find.populate({path: 'question'}).exec((err, answers) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!answers) {
        res.status(404).send({message: 'No hay respuestas'});
      }else {
        res.status(200).send({answers});
      }
    }
  });
}

function saveAnswer(req, res){
  var answer = new Answer();

  var params = req.body;
  answer.answer = params.answer;
  answer.condition = params.condition;
  answer.question = params.question;

  answer.save((err, answerStored) => {
    if (err) {
      res.status(500).send({message: 'ERROR al guardar la respuesta'});
    }else {
      if (!answerStored) {
        res.status(404).send({message: 'No se pudo guardar la respuesta'});
      }else {
        res.status(200).send({answer: answerStored});
      }
    }
  });
}

function updateAnswer(req, res){
  var answerId = req.params.id;
  var update = req.body;

  Answer.findByIdAndUpdate(answerId, update, (err, answerUpdate) => {
    if (err) {
      res.status(500).send({message: 'ERROR en el servidor'});
    }else {
      if (!answerUpdate) {
        res.status(404).send({message: 'No se ha actualizado la respuesta'});
      }else {
        res.status(200).send({answer: answerUpdate});
      }
    }
  });
}

function deleteAnswer(req, res){
  var answerId = req.params.id;
  Answer.findByIdAndRemove(answerId, (err, answerRemoved) => {
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
                res.status(200).send({answer: answerRemoved});
              }
            }
          });
        }
      }
  });
}


module.exports = {
  getAnswer,
  getAnswers,
  saveAnswer,
  updateAnswer,
  deleteAnswer
};
