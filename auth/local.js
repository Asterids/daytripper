const router = require('express').Router()
const { User } = require('../db/models')

// router.post('/signup', (req, res, next) => {
//   const { email, password } = req.body
//   User.create({ email, password })
//     .then(user => {
//       req.login(user, (err) => {
//         if (err) { return next(err) }
//         res.status(201).json(user);
//       })
//     })
//     .catch(next)
// })

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    where:
    { username, password },
  })
    .then((user) => {
      if (!user) {
        console.log('That user does not exist'); // replace with thrown error
      } else {
        req.login(user, (err) => {
          if (err) { return next(err); }
          res.end();
        })
      }
    })
    .catch(next);
});


// router.get('/me', (req, res, next) => {
//   res.json(req.user);
// })

router.delete('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(204);
});

module.exports = router;
