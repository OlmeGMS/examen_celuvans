'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Exam = require('../models/exam');
var Qualification = require('../models/qualification');

function getQualification(req, res){
  var qualificationId = req.params.id;

  Qualification.findById(qualificationId).populate({path: 'qualification'}).exec((err, qualification) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!qualification) {
        res.status(404).send({message: 'La calificación no existe'});
      }else {
        res.status(200).send({qualification});
      }
    }
  });
}

function getQualifications(req, res){
  var examId = req.params.qualification;
  var userId = req.params.qualification;

  if(!examId && !userId){
    var find = Qualification.find({}).sort('qualification');
  }else if (examId && !userId) {
    var find = Qualification.find({exam: examId}).sort('exam');
  }else if (!examId && userId) {
    var find = Qualification.find({user: userId}).sort('user');
  }

  find.populate({path: 'exam'}).exec((err, qualifications) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!qualification) {
        res.status(404).send({message: 'No hay calificaciones'});
      }else{
        res.status(200).send({qualifications});
      }
    }
  });


}

function getListQualifications(req, res){
  var find = Qualification.find({}).sort('qualification');

  find.populate({path: 'qualification'}).exec((err, qualifications) => {
    if (err) {
      res.status(500).send({message:' Error en la petición'});
    }else {
      if (!qualifications) {
        res.status(404).send({message: 'No hay calificaciones'});
      }else {
        res.status(200).send({qualifications})
      }
    }
  });
}

function saveQualification(req, res){
  var qualification = new Qualification();

  var params = req.body;

  qualification.exam = params.exam;
  qualification.user = params.user;
  qualification.score = params.score;
  qualification.intent = params.intent;

  qualification.save((err, qualificationStored) => {
    if (err) {
      res.status(500).send({message: 'Error al guardar la calificación'});
    }else {
      if (!qualificationStored) {
        res.status(404).send({message: 'No se pudo guardar la calificación'});
      }else {
        res.status(200).send({qualification: qualificationStored});
      }
    }
  });

}

function updateQualification(req, res){
  var qualificationId = req.params.id;
  var update = req.body;

  Qualification.findByIdAndUpdate(qualificationId, update, (err, qualificationUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!qualificationUpdate) {
        res.status(404).send({message: 'No se ha actualizado la calificación'});
      }else {
        res.status(200).send({qualification: qualificationUpdate});
      }
    }
  });
}

function deleteQualification(req, res){
  var qualificationId = req.params.id;

  Qualification.findByIdAndRemove(qualificationId, (err, qualificationRemove) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!qualification) {
        res.status(404).send({message: 'La calificacion no ha sido elimando'});
      }else {
        res.status(200).send({qualification: qualificationRemove});
      }
    }
  });
}

module.exports = {
  getQualification,
  getQualifications,
  getListQualifications,
  saveQualification,
  updateQualification,
  deleteQualification
};
