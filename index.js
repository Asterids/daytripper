const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

// Need both of the calls below to set up paths for static resource routing.
// Without the static middleware, will see 'Unexpected token <' error when server runs
app.use(express.static(path.join(__dirname, "/public")))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`Your server is listening on port ${port}`);
})
