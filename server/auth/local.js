const router = require('express').Router();
const { User } = require('../db/models');

router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;
  User.create({ username, email, password })
    .then((user) => {
      req.login(user, (err) => {
        if (err) { return next(err); }
        res.status(201).json(user);
      });
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    where:
    { username, password },
  })
    .then((user) => {
      if (!user) {
        res.status(400).send('This user does not exist.');
      } else {
        req.login(user, (err) => {
          if (err) { return next(err); }
          res.send({ username: user.username, userId: user.id });
        });
      }
    })
    .catch(next);
});


router.get('/me', (req, res, next) => {
  res.json(req.user);
})

router.delete('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(204);
});

module.exports = router;
