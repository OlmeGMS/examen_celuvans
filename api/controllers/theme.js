'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Question = require('../models/question');
var Answer = require('../models/answer');
var Exam = require('../models/exam');
var Theme = require('../models/theme');

function getTheme(req, res){
  var themeId = req.params.id;

  Theme.findById(themeId, (err, theme) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!theme) {
        res.status(404).send({message: 'El tema no existe'});
      }else {
        res.status(200).send({theme});
      }
    }
  });
}

function getThemes(req, res){
  if (req.params.page) {
    var page = req.params.page;
  }else {
    var page = 1;
  }

  var itemsPerPage = 3;

  Theme.find().sort('theme').paginate(page, itemsPerPage, function(err, themes, total){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!themes) {
        res.status(404).send({message: 'No hay temas creados !!'});
      }else {
        res.status(200).send({themes: themes});
      }
    }
  });
}

function getListThemes(req, res){

  Theme.find({}, function(err, themes){
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!themes) {
        res.status(404).send({message: 'No hay temas !!'});
      }else {
        res.status(200).send({themes: themes});
      }
    }
  });
}

function saveTheme(req, res){
  var theme = new Theme();

  var params = req.body;
  theme.name = params.name;

  theme.save((err, themeStored) => {
    if (err) {
      res.status(500).send({ message: 'Error: No se pudo guardar el tema' });
    }else {
      if (! themeStored) {
        res.status(404).send({ message: 'El tema no ha sido guardado' });
      }else {
        res.status(200).send({ theme: themeStored });
      }
    }
  });
}

function updateTheme(req, res) {
  var themeId = req.params.id;
  var update = req.body;

  Theme.findByIdAndUpdate(themeId, update, (err, themeUpdate) => {
    if (err) {
      res.status(500).send({ message: 'Error al actualizar el tema'});
    }else {
      if (!themeUpdate) {
        res.status(404).send({ message: 'EL tema no ha sido actualizada'});
      }else {
        res.status(200).send({ theme: themeUpdate });
      }
    }
  });
}

function deleteTheme(req, res) {
  var themeId = req.params.id;

  Theme.findByIdAndRemove(themeId, (err, themeRemove) => {
    if (err) {
      res.status(500).send({ message: 'Error al eliminar el tema' });
    }else {
      if (!themeRemove) {
        res.status(404).send({ message: 'El tema no ha sido eliminado' });
      }else {
        Theme.find({ theme: themeRemove._id }).remove((err, themeRemove) => {
          if (err) {
            res.status(500).send({ message: 'Error al eliminar el tema'});
          }else {
            if (!themeRemove) {
              res.status(404).send({ message: 'No se pudo eliminar el tema'});
            }else {
              res.status(200).send({ themeRemove });
            }
          }
        });
      }
    }
  });
}

module.exports = {
  getTheme,
  getThemes,
  getListThemes,
  saveTheme,
  updateTheme,
  deleteTheme
}
