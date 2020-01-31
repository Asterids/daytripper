const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') require('./secrets');

const session = require('express-session');
const models = require('./db/models');

app.use(session({
  secret: 'APintsAPoundTheWorldAround',
  resave: false,
  saveUninitialized: true,
}));

// FOR DEBUGGING PURPOSES ONLY -- REMOVE after implementing auth
app.use(function (req, res, next) {
  if (!req.session.counter) {
    req.session.counter = 0;
  }
  console.log(req.session)
  console.log('counter', ++req.session.counter);
  next();
});

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

models.db.sync()
  .then(() => {
    console.log('The postgres server is up and running!');
    app.listen(port, (err) => {
      if (err) throw err;
      console.log(`Your server is listening on port ${port}`);
    });
  })
  .catch(console.error);


module.exports = app;
