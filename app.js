const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') require('./secrets');

const session = require('express-session');
const { db, User } = require('./db/models');

app.use(session({
  secret: 'APintsAPoundTheWorldAround',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((userId, done) => {
  User.findByPk(userId)
    .then((user) => done(null, user))
    .catch(done);
});

app.use(passport.session());

// FOR DEBUGGING PURPOSES ONLY
// app.use((req, res, next) => {
//   console.log("Session REQ.USER:", req.user)
//   next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/api', require('./routes'));
app.use('/auth', require('./auth'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
  next();
});

db.sync()
  .then(() => {
    console.log('The postgres server is up and running!');
    app.listen(port, (err) => {
      if (err) throw err;
      console.log(`Your server is listening on port ${port}`);
    });
  })
  .catch(console.error);


module.exports = app;
