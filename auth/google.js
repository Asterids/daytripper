const router = require('express').Router();
const passport = require('passport');
const { User } = require('../db/models');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { googleClientId, googleClientSecret } = require('../secrets');

passport.use(
  new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/verify',
  },
  (token, refreshToken, profile, done) => {
    const userData = {
      username: (profile.displayName || profile.emails[0].value),
      email: profile.emails[0].value,
      googleId: profile.id,
    };
    User.findOrCreate({
      where: { googleId: userData.googleId },
      defaults: userData,
    })
    .spread((user) => done(null, user))
    .catch(done);
  })
);

router.get('/',
  passport.authenticate('google', {
    scope: 'email',
  }));

router.get('/verify',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
  }));

module.exports = router;
