const router = require('express').Router();
const axios = require('axios');
const { mapboxAPIKey } = require('../../secrets')

let dbName = process.env.NODE_ENV === 'test' ? '../db/test-db' : '../db/models';
const { User, Marker, MarkerList } = require(dbName);

router.use('/about', require('./about'));
router.use('/lists', require('./lists'));
router.use('/marker', require('./marker'));

router.get('/users', (req, res, next) => {
  User.findAll()
    .then((users) => res.json(users))
    .catch(next);
});

router.get('/search/:text', async (req, res, next) => {
  try {
    const { text } = req.params;
    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${mapboxAPIKey}&language=en&limit=1`);
    res.json(data);
  } catch (err) {
    next(err);
  }
})

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
