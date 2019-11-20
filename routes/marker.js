const router = require('express').Router();
const axios = require('axios');

router.get('/:lat/:long/:token', async(req, res, next) =>{
  try {
    const { lat, long, token } = req.params;
    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${token}`);
    const cityObj = data.features.find(elem => {
      return (
        (elem.place_type.includes('region') && elem.place_type.includes('place'))
        || elem.place_type.includes('place')
        || elem.place_type.includes('region')
      )
    })
    res.json(cityObj);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
