const router = require('express').Router();
const { User, Marker, MarkerList } = require('../db/models');

router.use('/about', require('./about')); // matches all requests to /api/about/
router.use('/marker', require('./marker'));

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .then(response => console.log("RESPONSE: " + response))
    .catch(next);
});

router.use(function (req, res, next) {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

module.exports = router;
