const User = require("../models/user");



// exports.postUser = (req, res) => {
//   const { username, password } = req.body;
//   User.findOne({ userName: username, password: password })
//     .then(user => {
//       if (user) {
//         res.render("welcome", {
//           title: "welcome",
//           user:user,
//         });
//       } else {
//         res.json("User not found");
//       }
//     })
//     .catch(error => {
//       console.error("Error retrieving user", error);
//     });
// };
// exports.getRegister = (req, res, next) => {
//   res.render("register", {
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


