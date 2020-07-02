const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const app = express();
process.env.PORT = 3200;
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  const SECRETS = require('./secrets');
  process.env.mapboxAPIKey = SECRETS.mapboxAPIKey;
  process.env.googleClientId = SECRETS.googleClientId;
  process.env.googleClientSecret = SECRETS.googleClientSecret;
  process.env.guestName = SECRETS.guestName;
  process.env.guestPass = SECRETS.guestPass;
  process.env.sessionSecret = SECRETS.sessionSecret;
  process.env.prodPostgres = SECRETS.prodPostgres;
}

const session = require('express-session');

let dbName = process.env.NODE_ENV === 'test' ? './server/db/test-db' : './server/db/models';
const { db, User } = require(dbName);

app.use(session({
  secret: process.env.sessionSecret,
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/api', require('./server/routes'));
app.use('/auth', require('./server/auth'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.sendFile(path.join(__dirname, '/public/index-dev.html'));
  } else {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  }
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
      console.log(`Your server is listening on port ${port} in ${process.env.NODE_ENV} mode`);
    });
  })
  .catch(console.error);


module.exports = app;
