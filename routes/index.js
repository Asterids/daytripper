const router = require('express').Router();

router.use('/about', require('./about')); // matches all requests to /api/about/
router.use('/marker', require('./marker'));

router.use(function (req, res, next) {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

module.exports = router;
