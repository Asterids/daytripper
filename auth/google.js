const router = require('express').Router();
const passport = require('passport');
const { User } = require('../db/models');

// process.env.G_CLIENT_ID
// process.env.G_CLIENT_SECRET

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get('/verify',
  passport.authenticate('google', {
    successRedirect: '/', // set path
    failureRedirect: '/', // set path
  }));

module.exports = router;
