const express = require('express');
const rolController = require('../controllers/rol');

const camino = express.Router();

camino.post('/create',rolController.post);

module.exports = camino;