const router = require('express').Router();
const axios = require('axios');
const { mapboxAPIKey } = require('../secrets')
const { Marker } = require('../db/models');


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

router.post('/save/:listId', (req, res, next) => {
  const { markersPrepared } = req.body;
  const { listId } = req.params;

  Marker.bulkCreate(markersPrepared)
    .then(() => {
      return Marker.findAll({
        where: {
          parentList: listId,
        },
      });
    })
    .then((foundMarkers) => {
      res.status(201).send(foundMarkers);
    })
    .catch(next);
});

module.exports = router;
