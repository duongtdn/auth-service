"use strict"

const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('./userDB');

passport.use(new LocalStrategy(authenticateByPassword));


function authenticateByPassword(username, password, done) {
  const user = db.findUserByPassword(username, password);
  if (user) {
    done(null, user);
  } else {
    done(null, false, { message: 'Incorrect username or password'});
  }
}

module.exports = passport;