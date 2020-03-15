const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

const Coordinator = require('../models/Coordinator');

// @route    GET api/coordinators
// @desc     List of Coordinators
// @access   Public
router.get('/', async (req, res) => {
  try {
    const coordinators = await Coordinator.find().sort({ station: 1 });
    res.json(coordinators);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/coordinators
// @desc     Register a coordinator
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is Required')
      .not()
      .isEmpty(),
    check('username', 'Username is Required')
      .not()
      .isEmpty(),
    check('station', 'Station is Required')
      .not()
      .isEmpty(),
    check('mobile', 'Mobile is Required')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid Email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      username,
      name,
      email,
      stationId,
      station,
      mobile,
      percentage,
      password
    } = req.body;

    try {
      let coordinator = await Coordinator.findOne({ username });

      if (coordinator) {
        return res.status(400).json({ msg: 'Coordinator Already Exists' });
      }
      coordinator = new Coordinator({
        username,
        name,
        email,
        stationId,
        station,
        mobile,
        percentage,
        password
      });

      const salt = await bcrypt.genSalt(10);

      coordinator.password = await bcrypt.hash(password, salt);

      await coordinator.save();

      const payload = {
        coordinator: {
          id: coordinator.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
