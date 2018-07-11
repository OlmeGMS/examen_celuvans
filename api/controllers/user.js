'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res){
  res.status(200).send({
    message: 'Probando el controlador de usuario de examen_celuvans'
  });
}

function saveUser(req, res){
  var user = new User();
  var params = req.body;

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.cedula = params.cedula;
  user.role = 'ROLE_USER';
  user.company = params.company;
  user.qualification = 'null';

  if (params.password) {
    //Cifrar las contraseña
    bcrypt.hash(params.password, null, null, function(err, hash){
      user.password = hash;
      if (user.name != null && user.surname != null && user.email != null && user.cedula != null && user.company != null ) {
        //Guardar el usuario
        user.save((err, userStored) => {
          if (err) {
              res.status(500).send({message: 'ERROR: No se pudo guardar el usuario'});
          }else {
              if (!userStored) {
                res.status(404).send({message: 'No se ha registrado el usuario'});
              }else {
                res.status(200).send({user: userStored});
              }
          }
        });
      }else {
        res.status(500).send({message: 'Rellena los campos'});
      }
    });
  }else {
    res.status(500).send({message: 'Introduce la contraseña'});
  }

}

function loginUser(req, res){
  var params = req.body;

  var email =  params.email;
  var password = params.password;

  User.findOne({email: email.toLowerCase()}, (err, user) => {
    if (err) {
      res.status(500).send({message: 'ERROR en la petición'});
    }else {
      if (!user) {
        res.status(404).send({message: 'El usuario no existe'});
      }else {
        //Comprobar la contraseña
        bcrypt.compare(password, user.password, function(err, check){
          if (check) {
            //Devolver los datos el usuario logueado
            if (params.gethash) {
              //Devolver  u token jwt
              res.status(200).send({
                token: jwt.createToken(user)
              });
            }else {
              res.status(200).send({user});
            }
          }else {
            res.status(404).send({message: 'El usuario no ha podido loguearse'});
          }
        });
      }
    }
  });
}

function updateUser(req, res){
  var userId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res.status(500).send({message: 'ERROR No se pudo actualizar el usuario'});
    }else {
        if (!userUpdated) {
          res.status(404).send({message: 'No se ha podido actualizar el usuario'});
        }else {
          res.status(200).send({user: userUpdated});
        }

    }
  });
}

function deleteUser(req, res){
  var userId = req.params.id;

  User.findByIdAndRemove(userId, (err, userRemove) => {
    if (err) {
      res.status(500).send({message: 'ERROR al eliminar el usuario'});
    }else {
      if (!userRemove) {
        res.status(404).send({message: 'El usuario no ha sido eliminado'});
      }else {
        res.status(200).send({userRemove});
      }
    }
  });
}

function uploadImage(req, res){
  var userId = req.params.id;
  var file_name = 'No subio...';

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
      User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
        if (!userUpdated) {
          res.status(404).send({message: 'No se ha podido actualizar el usuario'});
        }else {
          res.status(200).send({user: userUpdated});
        }
      });
    }else {
      res.status(200).send({message: 'La extensión del archivo no es valida'});
    }

    console.log(file_split);
  }else {
    res.status(200).send({message: 'No has subido ninguna imagen...'});

  }

}

function getImagenFile(){
   var imageFile = req.params.imageFile;
   var path_file = './uploads/users/'+imageFile;
   fs.exists(path_file, function(exists){
     if (exists) {
       res.sendFile(path.resolve(path_file));
     }else {
       res.status(200).send({message: 'No existe la imagen...'});
     }
   });
}

module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser,
  deleteUser,
  uploadImage,
  getImagenFile
};
