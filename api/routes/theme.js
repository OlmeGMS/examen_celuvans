'use strict'

var express = require('express');
var ThemeController = require('../controllers/theme');

var api  = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/theme/:id', md_auth.ensureAuth, ThemeController.getTheme);
api.get('/themes/:page?', md_auth.ensureAuth, ThemeController.getThemes);
api.get('/themes-list/', md_auth.ensureAuth, ThemeController.getListThemes);
api.post('/theme/', md_auth.ensureAuth, ThemeController.saveTheme);
api.put('/theme/:id', md_auth.ensureAuth, ThemeController.updateTheme);
api.delete('/theme/:id', md_auth.ensureAuth, ThemeController.deleteTheme);


module.exports = api;
