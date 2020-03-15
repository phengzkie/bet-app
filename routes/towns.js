const express = require('express');
const router = express.Router();

const Town = require('../models/Town');

// @route    GET api/towns
// @desc     Get towns
// @access   Private
router.get('/', async (req, res) => {
  try {
    const town = await Town.find();
    res.json(town);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/towns/:province
// @desc     Get towns of specific province
// @access   Private
router.get('/:province_id', async (req, res) => {
  try {
    const town = await Town.find({
      provinceId: req.params.province_id
    });
    res.json(town);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/towns
// @desc     Add towns
// @access   Private
router.post('/', async (req, res) => {
  const { name, province, provinceId } = req.body;

  try {
    let town = await Town.findOne({ name });

    if (town) {
      return res.status(400).json({ msg: 'Town Already Exists' });
    }

    town = new Town({
      name,
      province,
      provinceId
    });

    await town.save();
    res.json(town);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/town/:id
// @desc     Update town
// @access   Private
router.put('/:id', async (req, res) => {
  const { name, province } = req.body;

  //Build town object
  const townFields = {};
  if (name) townFields.name = name;
  if (province) townFields.province = province;

  try {
    let town = await Town.findById(req.params.id);

    if (!town) return res.status(404).json({ msg: 'Town not found' });

    town = await Town.findByIdAndUpdate(
      req.params.id,
      { $set: townFields },
      { new: true }
    );

    res.json(town);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/town/:id
// @desc     Delete town
// @access   Private
router.delete('/:id', async (req, res) => {
  try {
    let town = await Town.findById(req.params.id);

    if (!town) return res.status(404).json({ msg: 'Province not found' });

    await Town.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Town Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
