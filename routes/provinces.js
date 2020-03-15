const express = require('express');
const router = express.Router();

const Province = require('../models/Province');

// @route    GET api/provinces
// @desc     Get provinces
// @access   Private
router.get('/', async (req, res) => {
  try {
    const province = await Province.find();
    res.json(province);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/provinces
// @desc     Add province
// @access   Private
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    let province = await Province.findOne({ name });

    if (province) {
      return res.status(400).json({ msg: 'Province Already Exists' });
    }

    province = new Province({
      name
    });

    await province.save();
    res.json(province);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/provinces/:id
// @desc     Delete province
// @access   Private
router.delete('/:id', async (req, res) => {
  try {
    let province = await Province.findById(req.params.id);

    if (!province) return res.status(404).json({ msg: 'Province not found' });

    await Province.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Province Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/provinces/:id
// @desc     Update prvince
// @access   Private
router.put('/:id', async (req, res) => {
  const { name } = req.body;

  //Build province object
  const provinceFields = {};
  if (name) provinceFields.name = name;

  try {
    let province = await Province.findById(req.params.id);

    if (!province) return res.status(404).json({ msg: 'Province not found' });

    province = await Province.findByIdAndUpdate(
      req.params.id,
      { $set: provinceFields },
      { new: true }
    );

    res.json(province);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
