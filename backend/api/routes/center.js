const express = require('express');
const controllerCenter = require('../controllers/center');
const router = express.Router();


router.post('/create',controllerCenter.postCreateCenter);
router.get('/get/:name', controllerCenter.getCenter);
router.get('/getall',controllerCenter.getAllCenters);
router.put('/update/:id',controllerCenter.updateCenter);
router.delete('/delete/:id',controllerCenter.deleteCenter);


module.exports = router;