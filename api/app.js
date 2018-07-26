'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var theme_routes = require('./routes/theme');
var question_routes = require('./routes/question');
var answer_routes = require('./routes/answer');
var exam_routes = require('./routes/exam');
var questionnaire_routes = require('./routes/questionnaire');
var qualification_routes = require('./routes/qualification');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Se permite el acceso a todos los dominios
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); //cabecera ajax
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // metodos http
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

// rutas base
app.use('/api', user_routes);
app.use('/api', theme_routes);
app.use('/api', question_routes);
app.use('/api', answer_routes);
app.use('/api', exam_routes);
app.use('/api', questionnaire_routes);
app.use('/api', qualification_routes);

module.exports = app;
