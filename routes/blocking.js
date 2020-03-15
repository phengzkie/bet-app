const express = require('express');
const router = express.Router();

const Blocking = require('../models/Blocking');

const getDateToday = require('../client/src/functions/getDate');

router.get('/', async (req, res) => {
  try {
    const blocking = await Blocking.find({
      date: {
        $gte: getDateToday(),
        $lte: getDateToday()
      }
    });

    res.json(blocking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:date', async (req, res) => {
  const { type, blockCombination, province } = req.body;

  try {
    const newBlocking = new Blocking({
      date: req.params.date,
      type,
      bet: blockCombination,
      location: {
        province: province.split('&')[1]
      }
    });

    const blocking = await newBlocking.save();
    res.json(blocking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
