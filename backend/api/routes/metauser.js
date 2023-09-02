const express = require('express');
const controllerMetaUser = require('../controllers/metauser');
const router = express.Router();


router.post('/create',controllerMetaUser.postCrear);
router.put('/changestate/:id', controllerMetaUser.putStatus);
//Documenta Fabian
router.get('/inprocessrequestsgestor',controllerMetaUser.getInProcessRequests);
//Documenta Fabian
router.get('/inprocessrequestssolicitante',controllerMetaUser.getInProcessRequests2);
router.get('/request/:rol/:id',controllerMetaUser.getLastReq);
// router.get('/buscartodos/:nombre',controllerMetaUser.getMostrarTodos);
// router.get('/buscarultimo/:nombre',controllerMetaUser.getMostrarElUltimoIntroducido);

module.exports = router;