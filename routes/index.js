const router = require('express').Router();
const { User, Marker, MarkerList } = require('../db/models');

router.use('/about', require('./about')); // matches all requests to /api/about/
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

router.get('/lists/:userId', (req, res, next) => {
  const { userId } = req.params;
  MarkerList.findAll({
    where: {
      ownerId: userId,
    },
  })
    .then((lists) => {
      res.json(lists);
    })
    .catch(next);
});

router.get('/lists', (req, res, next) => {
  MarkerList.findAll()
    .then((lists) => {
      res.json(lists);
    })
    .catch(next);
});

router.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

module.exports = router;
