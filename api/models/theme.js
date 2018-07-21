'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThemeSchema = Schema({
  name: String
});

module.exports = mongoose.model('Theme', ThemeSchema);
