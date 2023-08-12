const express = require('express');
const controllerMetaUser = require('../controllers/metauser');
const router = express.Router();


router.post('/create',controllerMetaUser.postCrear);
router.get('/buscartodos/:nombre',controllerMetaUser.getMostrarTodos);


module.exports = router;