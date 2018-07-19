'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Question = require('../models/question');
var Answer = require('../models/answer');
var Exam = require('../models/exam');

function getExam(req, res) {
  var examId =  req.params.id;

  Exam.findById(examId).populate({path: 'user'}).populate({path: 'question'}).populate({path: 'answer'}).exec((err, exam) => {
    if (err) {
      res.status(500).send({message: 'ERROR en el servidor'});
    }else {
      if (!exam) {
        res.status(404).send({message: 'El examen no exite'});
      }else {
        res.status(200).send({exam});
      }
    }
  });

}

function getExams(req, res){
  var userId = req.params.user;
  if (!userId) {
    var find = Exam.find({}).sort('id');
  }else {
    var find = Exam.find({user: userId}).sort('id');
  }

  find.populate({
    path: 'user',
    populate: {
      path: 'question',
      model: 'Question'

    },

  }).populate({
    path: 'question',
    populate: {
      path: 'answer',
      model: 'Answer'

    },

  }).populate({
    path: 'answer',
    populate: {
      path: 'exam',
      model: 'Exam'

    },

  }).exec(function(err, exams){
    if (err) {
      res.status(500).send({message: 'ERROR en el servidor'});
    }else {
      if (!exams) {
        res.status(404).send({message: 'No hay Examenes'});
      }else {
        res.status(200).send({exams});      }
    }
  });
}

function getListExams(req, res){
  Exam.find({}, function(err, exams){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!exams) {
        res.status(404).send({message: 'No hay preguntas !!'});
      }else {
        return res.status(200).send({
          exams: exams
        });
      }
    }
  });
}

function saveExam(req, res) {
  var exam = new Exam();

  var params = req.body;
  exam.name = params.name;
  exam.user = params.user;
  exam.cant = params.cant;
  exam.intent = params.intent;

  exam.save((err, examStored) => {
    if (err) {
      res.status(500).send({message: 'ERROR en el servidor'});
    }else{
      if (!examStored) {
        res.status(404).send({message: 'No se ha guardado el examen'});
      }else {
        res.status(200).send({exam: examStored});
      }
    }

  });
}

function updateExam(req, res){
  var examId = req.params.id;
  var update = req.body;

  Exam.findByIdAndUpdate(examId, update, (err, examUpdate) => {
    if (err) {
      res.status(500).send({message: 'ERROR en el servidor'});
    }else {
      if (!examUpdate) {
        res.status(404).send({message: 'No se actualizo el examen'});
      }else {
        res.status(200).send({exam: examUpdate});
      }
    }
  });
}

function deleteExam(req, res){
  var examId = req.params.id;

  Exam.findByIdAndRemove(examId, (err, examRemoved) => {
    if (err) {
      res.status(500).send({message: 'ERROR en el servidor'});
    }else {
      if (!examRemoved) {
        res.status(404).send({message: 'No se ha borrado el examen'});
      }else {
        res.status(200).send({exam: examRemoved});
      }
    }
  });
}





module.exports = {
  getExam,
  getExams,
  getListExams,
  saveExam,
  updateExam,
  deleteExam
};
