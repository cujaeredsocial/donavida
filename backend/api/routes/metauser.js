const express = require('express');
const controllerMetaUser = require('../controllers/metauser');
const router = express.Router();


router.post('/create',controllerMetaUser.postCrear);


module.exports = router;