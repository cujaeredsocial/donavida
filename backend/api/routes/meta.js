const express = require('express');
const metaController = require('../controllers/meta');
camino = express.Router();

camino.post('/createmeta',metaController.post);

module.exports = camino;