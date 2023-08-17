const express = require('express');
const metaController = require('../controllers/meta');
const router = express.Router();

router.post('/create',metaController.post);
router.put('/update/:rol', metaController.update);
// camino.put('/update/:id',metaController.update);
router.get('/plantilla/:rol',metaController.get);


module.exports = router;