const router = require('express').Router();

let dbName = process.env.NODE_ENV === 'test' ? '../db/test-db' : '../db/models';
const { User, Marker, MarkerList } = require(dbName);

router.use('/about', require('./about')); // matches all requests to /api/about/
router.use('/lists', require('./lists'));
router.use('/marker', require('./marker'));

router.get('/users', (req, res, next) => {
  User.findAll()
    .then((users) => res.json(users))
    .catch(next);
});

router.get('/markers/:listId', (req, res, next) => {
  const { listId } = req.params;
  Marker.findAll({
    where: {
      parentList: listId,
    },
  })
    .then((markers) => res.json(markers))
    .catch(next);
});

router.get('/markers', (req, res, next) => {
  Marker.findAll()
    .then((markers) => res.json(markers))
    .catch(next);
});

router.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

module.exports = router;
