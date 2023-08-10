const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../../../config');

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
            manager: req.body.manager,
          });
          console.log(user._id);
          //Guardar usuario
          user.save();

          //Creando el token
          const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET, {
            expiresIn: config.JWT_EXPIRE,
          });
          user.token = token;
          res           
            .json({
              success: true,
              message: "LoggedIn Successfully",
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
  const { email, password } = req.body;
  if (!email || !password) {
    throw Error("Email and Password are required");
  }
  //Encontrar el usuario
  User.findOne({ email: email })
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
      console.log(password);
      console.log(user.password);
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
      res
        .cookie({ token: token })
        .json({ success: true, message: "LoggedIn Successfully" });
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
          manager: req.body.manager,
        });
      } else {
        updateUser = User.findByIdAndUpdate(id, {
          userName: req.body.userName,
          password: req.body.password,
          manager: req.body.manager,
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
exports.postAllUsers = (req, res) => {
  User.find()
    .then(users => {
      users.length > 0 ? res.json(users) : res.json("No users yet");
    })
    .catch(err => {
      res.status(403).json(err);
    });
};


//Buscar todos los usuarios donantes
exports.postAllDonorsUsers = (req, res) => {
  User.find({ manager: false })
    .then(users => {
      users.length > 0 ? res.json(users) : res.json("Not doners yet");
    })
    .catch(err => {
      res.status(403).json("Error Finding Doners " + err);
    });
};


//Buscar todos los usuarios gestores
exports.postAllManagersUsers = (req, res) => {
  User.find({ manager: true })
    .then(manager => {
      manager.length > 0 ? res.json(manager) : res.json("No managers yet");
    })
    .catch(err => res.status(403).json("Error Finding Managers " + err));
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
