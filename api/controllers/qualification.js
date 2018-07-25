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
