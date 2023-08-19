const express = require("express");
const router = express.Router();
const controller = require('./databaseController');

router.get('/database', controller.LoadDatabase);

module.exports = router;