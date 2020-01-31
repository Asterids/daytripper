const router = require('express').Router()
const { User } = require('../db/models')
// const HttpError = require('../utils/HttpError')

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
      // here we are serializing the user:
        req.session.userId = user.id;
        res.end();
        // req.login(user, (err) => {
        //   console.log('Logged in: ', user);
        //   if (err) { return next(err) }
        //   return res.json(user);
        // // gives us a req.user object
        // })
      }
    })
    .catch(next);
});

// router.get('/me', (req, res, next) => {
//   // deserializing the user:
//   // we've got an id and based on that we want to get our user instance back
//   res.json(req.user);
// })

// router.get('/me', async (req, res, next) => {
//   res.json(req.user || {});
// })

router.delete('/logout', (req, res, next) => {
  req.session.destroy();
  // req.logout();
  res.sendStatus(204);
});

module.exports = router;
