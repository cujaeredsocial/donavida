const express = require('express');
const metaController = require('../controllers/meta');
const camino = require('./rol');
camino = express.Router();

camino.post('/create',metaController.post);
camino.put('/update/:id',metaController.update);
camino.get('/plantilla/:rol',metaController.get);
camino.get('/delete/:rol',metaController.delete);

module.exports = camino;