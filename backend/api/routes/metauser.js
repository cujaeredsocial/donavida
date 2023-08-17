const express = require('express');
const controllerMetaUser = require('../controllers/metauser');
const router = express.Router();


router.post('/create',controllerMetaUser.postCrear);
router.put('/changestate/:id', controllerMetaUser.putStatus);
router.get('/inprocessrequests',controllerMetaUser.getInProcessRequests);
// router.get('/buscartodos/:nombre',controllerMetaUser.getMostrarTodos);
// router.get('/buscarultimo/:nombre',controllerMetaUser.getMostrarElUltimoIntroducido);

module.exports = router;