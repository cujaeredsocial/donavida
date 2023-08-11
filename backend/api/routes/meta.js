const express = require('express');
const metaController = require('../controllers/meta');
camino = express.Router();

camino.post('/create',metaController.post);

module.exports = camino;