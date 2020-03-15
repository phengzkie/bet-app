const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const Collector = require('../models/Collector');
const Bet = require('../models/Bet');
const authCoor = require('../middleware/authCoor');

const getDateToday = require('../client/src/functions/getDate');

const mongoose = require('mongoose');

// @route    GET api/collectors
// @desc     Get collectors
// @access   Private
router.get('/', authCoor(), async (req, res) => {
  try {
    const collectors = await Collector.find({
      coordinator: req.coordinator.id
    }).sort({
      date: -1
    });
    res.json(collectors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/collectors
// @desc     Get collectors
// @access   Private
router.get('/data/:date', authCoor(), async (req, res) => {
  try {
    const date1 = new Date(req.params.date);
    date1.setDate(date1.getDate() + 1);

    const bets = await Bet.aggregate([
      {
        $match: {
          date: {
            $gt: new Date(req.params.date),
            $lt: date1
          }
        }
      },
      {
        $match: {
          coordinator: new mongoose.Types.ObjectId(req.coordinator.id)
        }
      },
      {
        $group: {
          _id: '$collector',
          total: { $sum: '$amount' }
        }
      }
    ]);

    const tests = await Collector.populate(bets, { path: '_id' });

    const data = tests.map(test => {
      return {
        _id: test._id._id,
        mobile: test._id.mobile,
        percentage: test._id.percentage,
        name: test._id.name,
        gross: test.total,
        pay: test.total * (test._id.percentage / 100),
        net: test.total - test.total * (test._id.percentage / 100)
      };
    });

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/collector
// @desc     Add new collector
// @access   Private
router.post(
  '/',
  [
    authCoor(),
    [
      check('name', 'Name is Required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, mobile, percentage } = req.body;

    try {
      const newCollector = new Collector({
        name,
        mobile,
        percentage,
        coordinator: req.coordinator.id
      });

      const collector = await newCollector.save();
      res.json(collector);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/collector/:id
// @desc     Update collector
// @access   Private
router.put('/:id', authCoor(), async (req, res) => {
  const { name, mobile, percentage } = req.body;

  //Build collector object
  const collectorFields = {};
  if (name) collectorFields.name = name;
  if (mobile) collectorFields.mobile = mobile;
  if (percentage) collectorFields.percentage = percentage;

  try {
    let collector = await Collector.findById(req.params.id);

    if (!collector) return res.status(404).json({ msg: 'Collector not found' });

    // Make sure coordinator owns collectors
    if (collector.coordinator.toString() !== req.coordinator.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    collector = await Collector.findByIdAndUpdate(
      req.params.id,
      { $set: collectorFields },
      { new: true }
    );

    res.json(collector);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/collector/:id
// @desc     Delete collector
// @access   Private
router.delete('/:id', authCoor(), async (req, res) => {
  try {
    let collector = await Collector.findById(req.params.id);

    if (!collector) return res.status(404).json({ msg: 'Collector Not Found' });

    // Make sure coordinator owns collector
    if (collector.coordinator.toString() !== req.coordinator.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Collector.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Collector Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
