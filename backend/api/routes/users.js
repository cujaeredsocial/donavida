const express = require("express");
const isAuthenticated = require('../middleware/authenticate');
const userController = require("../controllers/user");

const router = express.Router();

router.post("/createuser", userController.postCreateUser);
router.post('/login', userController.postAuthenticateUser);
router.post("/updateuser", userController.postUpdateUser);
router.get('/allusers', userController.postAllUsers);
router.post("/deleteuser", userController.postDeleteUser);


module.exports = router;
