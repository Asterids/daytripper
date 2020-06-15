const router = require('express').Router();

let dbName = process.env.NODE_ENV === 'test' ? '../db/test-db' : '../db/models';
const { User, Marker, MarkerList } = require(dbName);

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

router.put('/save/:listId', (req, res, next) => {
  const { title, notes } = req.body;
  const { listId } = req.params;

  MarkerList.findByPk(listId)
    .then((list) => list.update({
      title,
      notes,
    }))
    .then((list) => {
      res.status(201).send(list);
    })
    .catch(next);
});

router.delete('/:listId', (req, res, next) => {
  const { listId } = req.params;

  console.log("INSIDE DELETE")
  MarkerList.destroy({ where: { id: listId } })
    .then(() => res.sendStatus(204))
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
