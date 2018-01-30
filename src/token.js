"use strict"

const jwt = require('jsonwebtoken');

function generateToken(keys) {
  return function(req, res, next) {
    const tokens = {};
    const services = req.user.services;
    for(let service in services) {
      if (keys[service]) {
        const token = jwt.sign({
          _id: req.user._id,
        }, keys[service], {
          expiresIn: "14 days"
        });
        tokens[service] = token;
      }   
    }
    req.tokens = tokens;
    next();
  }
}

module.exports = { generateToken }