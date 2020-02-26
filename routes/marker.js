const router = require('express').Router();
const axios = require('axios');
const { mapboxAPIKey } = require('../secrets')

router.get('/:lat/:long/:token', async (req, res, next) => {
  try {
    const { lat, long } = req.params;
    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${mapboxAPIKey}&language=en`);
    const cityObj = data.features.find((elem) => (
      (elem.place_type.includes('region') && elem.place_type.includes('place'))
        || elem.place_type.includes('place')
        || elem.place_type.includes('region')
    ));
    res.json(cityObj);
  } catch (err) {
    next(err);
  }
});

// first we need to save the markerList
// then we need to save the individual markers and associate them
router.post('/save', (req, res, next) => {
  const { placeName,  } = req.body;
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
          res.send({ username: user.username });
        });
      }
    })
    .catch(next);
});

module.exports = router;
