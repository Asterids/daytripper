const router = require('express').Router();
const axios = require('axios');

router.get('/', async(req, res, next) =>{
  try {
    console.log(req.body);
    const { lat, long } = req.body;
    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${accessToken}`);
    res.json(data);
    console.log(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
