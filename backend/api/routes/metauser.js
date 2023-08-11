const express = require('express');
const metaUserController = require('../controllers/metauser');
const camino = express.Router();


camino.put('/update/:id',metaUserController.update);
camino.get('/:id',metaUserController.get);
camino.get('/:id',metaUserController.delete);

module.exports = camino;