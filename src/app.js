"use strict"
/* require dependency modules */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('./authen');

const { getServiceKeys } = require('./keys');

const { serializeUser } = require('./serialize');
const { generateToken } = require('./token');



/* initialize and configure server */
const app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(passport.initialize())
  .use(cors());

/* setup route */
app.post('/login',
  passport.authenticate('local', {
    session : false
  }),
  generateToken(getServiceKeys()),
  serializeUser,
  (req, res, next) => { res.status(200).json({user: req.user, tokens: req.tokens}) }

);

module.exports = app;