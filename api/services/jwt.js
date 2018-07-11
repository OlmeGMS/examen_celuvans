'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_examen_celuvans';

exports.createToken = function(user){
    var payload = {
      sub: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      cedula: user.cedula,
      role: user.role,
      company: user.company,
      qualification: user.qualification,
      iat: moment().unix(),
      exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};
