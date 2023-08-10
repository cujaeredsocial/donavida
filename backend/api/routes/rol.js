const express = require('express');
const rolController = require('../controllers/rol');

const camino = express.Router();

camino.post('/createrol',rolController.post);

module.exports = camino;