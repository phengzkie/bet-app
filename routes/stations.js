const express = require('express');
const router = express.Router();

const Station = require('../models/Station');
const Town = require('../models/Town');
const Province = require('../models/Province');

// @route    GET api/stations
// @desc     Get stations
// @access   Private
router.get('/', async (req, res) => {
  try {
    const station = await Station.find();
    res.json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/stations/:town
// @desc     Get stations of specific town
// @access   Private
router.get('/:town_id', async (req, res) => {
  try {
    const station = await Station.find({
      townId: req.params.town_id
    });
    if (station) {
      res.json(station);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/stations
// @desc     Add stations
// @access   Private
router.post('/', async (req, res) => {
  const { name, town, percentage, townId } = req.body;

  try {
    let station = await Station.findOne({ name });

    if (station) {
      return res.status(400).json({ msg: 'Station Already Exists' });
    }

    station = new Station({
      name,
      percentage,
      town,
      townId
    });

    await station.save();
    res.json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/stations/:id
// @desc     Update station
// @access   Private
router.put('/:id', async (req, res) => {
  const { name, town, percentage } = req.body;

  //Build station object
  const stationFields = {};
  if (name) stationFields.name = name;
  if (town) stationFields.town = town;
  if (percentage) stationFields.percentage = percentage;

  try {
    let station = await Station.findById(req.params.id);

    if (!station) return res.status(404).json({ msg: 'Station not found' });

    station = await Station.findByIdAndUpdate(
      req.params.id,
      { $set: stationFields },
      { new: true }
    );

    res.json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/stations/:id
// @desc     Delete station
// @access   Private
router.delete('/:id', async (req, res) => {
  try {
    let station = await Station.findById(req.params.id);

    if (!station) return res.status(404).json({ msg: 'Station not found' });

    await Station.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Station Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
