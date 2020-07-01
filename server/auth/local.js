const router = require('express').Router();
const { User } = require('../db/models');
const crypto = require('crypto');

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({where:
    { username },
  })
    .then((user) => {
      if (!user) {
        User.create({ username, password })
        .then((user) => {
          req.login(user, (err) => {
            if (err) { return next(err); }
            res.status(201).json(user);
          });
        })
        .catch(next);
      } else (
        res.status(400).send("This username already exists")
      )
    })
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    where:
    { username },
  })
    .then((user) => {
      if (!user) {
        res.status(400).send({ error: "This username does not exist" });
      } else {
        // using the salt, run the hash function again, and then check whether the candidate password matches the saved password
        const salt = user.salt;
        const pwHashed = crypto.createHash('RSA-SHA256')
          .update(password)
          .update(salt)
          .digest('hex')
        if (pwHashed === user.password) {
          req.login(user, (err) => {
            if (err) { return next(err); }
            res.send({ username: user.username, userId: user.id });
          });
        } else {
          res.status(400).send({ error: "Invalid password" });
        }
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
