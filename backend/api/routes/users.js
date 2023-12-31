const express = require("express");
const verifyToken = require("../middleware/authenticate");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/createuser", userController.postCreateUser);
router.post("/login", userController.postAuthenticateUser);
router.post("/updateuser", userController.postUpdateUser);
router.get("/allusers", userController.getAllUsers);
router.get("/users/:userName", userController.getUser);
router.post("/deleteuser", userController.postDeleteUser);
//router.post("/rol_asign", userController.AsignarRol);

router.get("/token", verifyToken, (req, res) => {
  res.json("Access granted");
});

module.exports = router;
