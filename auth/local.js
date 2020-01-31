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
  const { email, password } = req.body;
  User.findOne({
    where:
    { email, password },
  })
    .then((user) => {
      if (!user) {
        console.log('That user does not exist'); // replace with thrown error
      } else {
        req.session.userId = user.id;
        res.end();
        // req.login(user, (err) => {
        //   if (err) { return next(err) }
        //   return res.json(user);
        // })
      }
    })
    .catch(next);
});

// router.get('/me', (req, res, next) => {
//   res.json(req.user);
// })

router.delete('/logout', (req, res, next) => {
  req.session.destroy();
  // req.logout();
  res.sendStatus(204);
});

module.exports = router;
