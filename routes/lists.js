const router = require('express').Router();
const { User, Marker, MarkerList } = require('../db/models');

router.get('/:userId', (req, res, next) => {
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

router.post('/new/:userId', (req, res, next) => {
  const { title, notes } = req.body;
  const { userId } = req.params;

  MarkerList.create({
    ownerId: userId,
    title,
    notes,
  })
    .then((list) => {
      res.status(201).send(list);
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  MarkerList.findAll()
    .then((lists) => {
      res.json(lists);
    })
    .catch(next);
});

module.exports = router;
