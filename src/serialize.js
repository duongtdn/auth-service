"use strict"

function serializeUser(req, res, next) {
  req.user.services = null;
  next();
}

module.exports = { serializeUser }