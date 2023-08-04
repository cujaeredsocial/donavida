const User = require("../models/user");

//Crear un usuario AFRO
exports.postCreateUser = (req, res) => {
  console.log(req.body.username);
  const user = new User({
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
    manager: req.body.manager,
  });
  user
    .save()
    .then(user => {
      res.json("User Created" + user);
    })
    .catch(err => res.json("Error Creating User" + err));
};

//Leer un usuario por nombre y contrasenna FABIAN
exports.postReedUser = (req, res) => {
  User.find({name: req.body.name , pasword: req.body.password})
  .then(userReturn =>
    res.json(userReturn))
  .catch(err => 
      res.json(err));
};
//Actualizar un usuario AFRO
exports.postUpdateUser = (req, res) => {
  const id = req.body.userId;
  let updateUser;
  User.findById(id)
    .then(user => {
      if (user.email !== req.body.email) {
        updateUser = User.findByIdAndUpdate(id, {
          userName: req.body.username,
          password: req.body.password,
          email: req.body.email,
          manager: req.body.manager,
        });
      } else {
        updateUser = User.findByIdAndUpdate(id, {
          userName: req.body.username,
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
      res.json("Error updating user" + err);
    });
};
//Buscar todos los usuarios FABIAN
exports.postAllUsers = (req, res) => {
 User.find()
  .then(users =>{
    users.length > 0 ? res.json(users)
    :res.json("No users yet")}
  ).catch(err =>
    res.json(err)
  );
};
//Buscar todos los usuarios donantes AFRO
exports.postAllDonorsUsers = (req, res) => {
  User.find({ manager: false })
    .then(users => {
      users.length > 0 ? res.json(users) : res.json("Not doners yet");
    })
    .catch(err => {
      res.json("Error Finding Doners " + err);
    });
};
//Buscar todos los usuarios gestores FABIAN
exports.postAllManagersUsers = (req, res) => {
  User.find({manager:true})
  .then(manager =>{ 
   manager.length > 0 ? res.json(manager)
   :res.json("No managers yet")})
   .catch(err => 
     res.json(err));
 };
//Eliminar un usuario por id AFRO
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
    .catch(err => res.json("Can't delete the user" + err));
};

// exports.getUsers = (req, res, next) => {
//   User.find()
//     .then(users => {
//       res.render("login", {
//         title: "Login",
//         users: users,
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.getRegister = (req, res, next) => {

//   res.render('register', {
//     title: "Register",
//   });
// };

// exports.postAddUser = (req, res, next) => {
//   const userName = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;
//   const user = new User({
//     userName: userName,
//     email: email,
//     password: password,
//   });
//   user.save().then(result => {
//     console.log("User created");
//     res.redirect("/login");
//   });
// };

// exports.getUpdate = (req, res, next) => {
//   const id = req.params.id;
//   User.findById(id)
//     .then(user => {
//       if (user) {
//         res.render("edit", {
//           title: "Edit User",
//           user: user,
//         });
//       } else {
//         res.json("User not found");
//       }
//     })
//     .catch(error => {
//       console.error("Error retrieving user", error);
//     });
// };
// exports.postUpdate = (req, res, next) => {
//     User.findByIdAndUpdate(req.body.userId, {userName:req.body.username,email:req.body.email,password:req.body.password})
//     .then(() => {
//      res.redirect('/login');
//     })
//     .catch((error) => {
//       console.error('Error updating user', error);
//     });
// };
// exports.getUserAndDelete = (req, res, next) => {
//     User.findByIdAndRemove(req.params.id)
//     .then(() => {
//      res.redirect('/login');
//     })
//     .catch((error) => {
//       console.error('Error deleting user', error);
//     });
// };
