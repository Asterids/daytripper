const router = require('express').Router();
const axios = require('axios');

const mapboxAPIKey = process.env.mapboxAPIKey;

let dbName = process.env.NODE_ENV === 'test' ? '../db/test-db' : '../db/models';
const { Marker } = require(dbName);


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


// list object comes in containing all markers
// bulk create all markers in the object - route used for adding new markers only
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


router.delete('/:markerId', (req, res, next) => {
  const { markerId } = req.params;

  Marker.destroy({ where: { id: markerId } })
  .then(() => res.sendStatus(204))
  .catch(next);
});


module.exports = router;
