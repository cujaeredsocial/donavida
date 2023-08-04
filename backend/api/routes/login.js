const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/createuser", userController.postCreateUser);
router.post('/user', userController.postReedUser);
router.post("/updateuser", userController.postUpdateUser);
router.post('/allusers', userController.postAllUsers);
router.post("/donorssusers", userController.postAllDonorsUsers);
router.post('/managersuser', userController.postAllManagersUsers);
router.post("/deleteuser", userController.postDeleteUser);

module.exports = router;
