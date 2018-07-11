'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  cedula: String,
  role: String,
  company: String,
  qualification: String,

});

module.exports = mongoose.model('User', UserSchema);
