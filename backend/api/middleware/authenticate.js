const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require('../config');

const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next("Please login to access the data");
  }
  const verify = jwt.verify(token, config.TOKEN_SECRET);
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

 