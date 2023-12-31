const User = require("../models/user");
const MetaUser = require("../models/MetaUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../../config");

//Crear un usuario
exports.postCreateUser = (req, res) => {
  //Verificar que ningun campo esta vacio
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw new Error("need to complete all fields");
  }
  //Verificar que el email no se repita
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        throw new Error("email " + email + " already exist ");
      } else {
        return user;
      }
    })
    .then(user => {
      //Crear contrasenna con hash
      bcrypt.genSalt(5, function (err, salt) {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) throw err;

          //Crear usuario
          console.log("hash " + req.body.password);
          user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
          });
          //Guardar usuario
          user.save();
          res.json({
            success: true,
            message: "UserCreate Succesfully",
            user: user,
          });
        });
      });
    })
    .catch(err => res.status(400).json("Error Creating User:" + err));
};

//Autentificar usuario en sustitucion de buscar usuario
exports.postAuthenticateUser = (req, res, next) => {
  let userAux;
  //Comprobar que los campos no esten vacios
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw Error("Username and Password are required");
  }
  //Encontrar el usuario
  User.findOne({ userName: userName })
    .then(user => {
      if (!user) {
        throw Error("Wrong Credentials");
      } else {
        return user;
      }
      //Verificar que la contrasennas coincidan
    })
    .then(user => {
      userAux = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isPasswordMatched => {
      console.log(isPasswordMatched);
      if (!isPasswordMatched) {
        throw Error("Wrong Credentials Password");
      } else {
        return jwt.sign({ id: userAux._id }, config.TOKEN_SECRET, {
          expiresIn: config.JWT_EXPIRE,
        });
      }
    })
    .then(token => {
      console.log(token);
      res
        .cookie("token", token)
        .json({ success: true, message: "LoggedIn Successfully", user:userAux });
    })
    .catch(err => res.status(401).json(err));
};

//Actualizar un usuario
exports.postUpdateUser = (req, res) => {
  const id = req.body.userId;
  let updateUser;
  User.findById(id)
    .then(user => {
      if (user.email !== req.body.email) {
        updateUser = User.findByIdAndUpdate(id, {
          userName: req.body.userName,
          password: req.body.password,
          email: req.body.email,
        });
      } else {
        updateUser = User.findByIdAndUpdate(id, {
          userName: req.body.userName,
          password: req.body.password,
        });
      }
      return updateUser;
    })
    .then(user => {
      res.json("User Update" + user);
    })
    .catch(err => {
      res.status(402).json("Error updating user" + err);
    });
};

//Buscar todos los usuarios
exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => {
      users.length > 0 ? res.json(users) : res.json("No users yet");
    })
    .catch(err => {
      res.status(403).json(err);
    });
};

//Eliminar un usuario por id
exports.postDeleteUser = (req, res) => {
  const id = req.body.userId;
  User.findByIdAndDelete(id)
    .then(user => {
      if (user) {
        res.json("User Deleted" + user);
      } else {
        throw new Error("User not Found");
      }
    })
    .catch(err => res.status(404).json("Can't delete the user" + err));
};

exports.getUser = (req, res) => {
  const userName = req.params.userName;
  User.findOne({ userName: userName })
    .then(user => {
      res.json({ message: "User found", user: user });
    })
    .catch(err => {
      res.status(404).json(err);
    });
};
