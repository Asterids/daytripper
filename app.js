const path = require('path');
const express = require('express');

const app = express();

const session = require('express-session');

app.use(session({
  secret: 'APintsAPoundTheWorldAround',
  resave: false,
  saveUninitialized: true,
}));

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morgan = require('morgan');
const models = require('./db/models');

app.use(morgan('dev'));


app.use('/api', require('./routes'));

// Need both of the calls below to set up paths for static resource routing.
// Without the static middleware, will see 'Unexpected token <' error when server runs
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

const port = process.env.PORT || 5000;

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
