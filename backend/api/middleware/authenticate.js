const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next("Please login to access the data");
  }
  const verify = jwt.verify(token, process.env.TOKEN_SECRET);
  req.user = User
    .findById(verify.id)
    .then(() => {
      next();
    })
    .catch(err => {
      next(err);
    });
};

module.exports = isAuthenticated;

 