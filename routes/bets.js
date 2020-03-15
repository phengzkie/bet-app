const express = require('express');
const router = express.Router();

const Bet = require('../models/Bet');
const Collector = require('../models/Collector');
const Coordinator = require('../models/Coordinator');
const Station = require('../models/Station');
const Town = require('../models/Town');
const Province = require('../models/Province');
const Blocking = require('../models/Blocking');
const Limit = require('../models/Limit');

const async = require('async');

const getDateToday = require('../client/src/functions/getDate');

// @route    POST api/bets/mobile/data
// @desc     POST all users bets
// @access   Private
router.post('/:mobile/:data', async (req, res) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    var dateToday = new Date(today);

    const message = req.params.data;
    // get the bet game
    const getBetGame = message.split('=')[1].split(':')[0];

    // get the Bet Type
    const getBetType = message.split('=')[0];

    // seperate the msg
    const splitMsg = message.split(':')[1].split(' ');

    const mobile = req.params.mobile;

    var betGame = '';

    if (getBetGame === 'AM' && getBetType === 'S1') {
      betGame = `${getBetGame} Cut-Off 11:10AM`;
    }
    if (getBetGame === 'AM' && getBetType === 'S2') {
      betGame = `${getBetGame} Cut-Off 11:10AM`;
    }
    if (getBetGame === 'AM' && getBetType === 'S3') {
      betGame = `${getBetGame} Cut-Off 10:50AM`;
    }
    if (getBetGame === 'AM' && getBetType === 'L2') {
      betGame = `${getBetGame} Cut-Off 10:50AM`;
    }
    if (getBetGame === 'PM' && getBetType === 'S1') {
      betGame = `${getBetGame} Cut-Off 4:10PM`;
    }
    if (getBetGame === 'PM' && getBetType === 'S2') {
      betGame = `${getBetGame} Cut-Off 4:10PM`;
    }
    if (getBetGame === 'PM' && getBetType === 'S3') {
      betGame = `${getBetGame} Cut-Off 3:50PM`;
    }
    if (getBetGame === 'PM' && getBetType === 'L2') {
      betGame = `${getBetGame} Cut-Off 3:50PM`;
    }
    if (getBetGame === 'EXTRA' && getBetType === 'S1') {
      betGame = `${getBetGame} Cut-Off 8:20PM`;
    }
    if (getBetGame === 'EXTRA' && getBetType === 'S2') {
      betGame = `${getBetGame} Cut-Off 8:20PM`;
    }
    if (getBetGame === 'EXTRA' && getBetType === 'S3') {
      betGame = `${getBetGame} Cut-Off 8:50PM`;
    }
    if (getBetGame === 'EXTRA' && getBetType === 'L2') {
      betGame = `${getBetGame} Cut-Off 8:50PM`;
    }

    const collector = await Collector.findOne({ mobile }).populate(
      'coordinator',
      '_id'
    );

    if (collector) {
      const coordinator = await Coordinator.findOne({
        _id: collector.coordinator
      });

      if (coordinator) {
        const station = await Station.findOne({ _id: coordinator.stationId });
        if (station) {
          const town = await Town.findOne({ _id: station.townId });
          if (town) {
            const province = await Province.findOne({ name: town.province });
            if (province) {
              const blocking = {
                bet: 'None'
              };

              const limits = [];
              const bets = [];
              const betLimits = [];
              const betCombi = [];
              const betCombi2 = [];

              splitMsg.map(msg => {
                msg = msg.split(',');

                Limit.findOne({
                  date: {
                    $gte: dateToday
                  },
                  type: getBetType,
                  game: getBetGame,
                  bet: msg[0],
                  coordinator: coordinator._id
                }).exec(async (err, limit) => {
                  try {
                    if (limit) {
                      betCombi2.push(limit.bet);
                      if (limit.totalAmount + Number(msg[1]) <= 2000) {
                        limits.push('false');

                        const updateTotal = await Limit.findOneAndUpdate(
                          {
                            date: {
                              $gte: dateToday
                            },
                            type: getBetType,
                            bet: msg[0],
                            game: getBetGame,
                            coordinator: coordinator._id
                          },
                          {
                            $inc: { totalAmount: msg[1] }
                          }
                        );
                      } else {
                        limits.push('true');
                        res.send(`Limit ${getBetType},${betCombi2}`);
                      }

                      bet1 = {
                        date: new Date(),
                        sender: mobile,
                        type: getBetType,
                        game: getBetGame,
                        bet: msg[0],
                        amount: msg[1],
                        collector: collector._id,
                        coordinator: coordinator._id,
                        location: {
                          station: station._id,
                          town: town._id,
                          province: province.name
                        }
                      };
                      bets.push(bet1);

                      if (bets.length === limits.length) {
                        if (limits.includes('true')) {
                        } else {
                          //Save to database

                          await Bet.insertMany(bets, (err, result) => {});
                          res.send(`Bet/s Received ${getBetType} ${betGame}`);
                          console.log('reply success');
                        }
                      }
                    } else {
                      //First bet entry, no limit yet

                      data = {
                        date: dateToday,
                        type: getBetType,
                        bet: msg[0],
                        game: getBetGame,
                        coordinator: coordinator._id,
                        totalAmount: msg[1]
                      };

                      bet1 = {
                        date: new Date(),
                        sender: mobile,
                        type: getBetType,
                        game: getBetGame,
                        bet: msg[0],
                        amount: msg[1],
                        collector: collector._id,
                        coordinator: coordinator._id,
                        location: {
                          station: station._id,
                          town: town._id,
                          province: province.name
                        }
                      };
                      bets.push(bet1);
                      betLimits.push(data);

                      if (Number(msg[1]) > 2000) {
                        betCombi.push(msg[0]);
                      }

                      if (Number(msg[1]) <= 2000) {
                        limits.push('false');
                        if (limits.includes('true')) {
                          console.log('may limit', betCombi);
                        } else {
                          if (bets.length === splitMsg.length) {
                            //Save to database
                            res.send(`Bet/s Received ${getBetType} ${betGame}`);

                            await Bet.insertMany(bets, (err, result) => {});
                            console.log('reply success');

                            // save to limit db
                            await Limit.insertMany(betLimits, (err, result) => {
                              if (!err) {
                                console.log('limit');
                              }
                            });
                          }
                        }
                      } else {
                        limits.push('true');
                        if (bets.length === splitMsg.length) {
                          res.send(`Limit ${getBetType},${betCombi}`);
                        }
                      }
                    }
                  } catch (err) {
                    console.error(err);
                  }
                });
              });
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/bets/block
// @desc     GET all blocked bets block/0945875665/L2S3/
// @access   Private
router.get('/block/:mobile/:type', async (req, res) => {
  try {
    //const mobile = sender.replace(/^.{2}/g, '0');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    var dateToday = new Date(today);

    const mobile = req.params.mobile;
    const getBlockType = req.params.type;
    const collector = await Collector.findOne({ mobile }).populate(
      'coordinator',
      '_id'
    );
    if (collector) {
      const coordinator = await Coordinator.findOne({
        _id: collector.coordinator
      });
      if (coordinator) {
        const station = await Station.findOne({ _id: coordinator.stationId });
        if (station) {
          const town = await Town.findOne({ _id: station.townId });
          if (town) {
            const province = await Province.findOne({ name: town.province });
            if (province) {
              const blocking = await Blocking.find({
                date: {
                  $gte: dateToday,
                  $lte: dateToday
                },
                type: getBlockType,
                'location.province': province.name
              });
              if (getBlockType === 'L2S3') {
                const s3 = await Blocking.find({
                  date: {
                    $gte: dateToday,
                    $lte: dateToday
                  },
                  type: 'S3',
                  'location.province': province.name
                });
                const l2 = await Blocking.find({
                  date: {
                    $gte: dateToday,
                    $lte: dateToday
                  },
                  type: 'L2',
                  'location.province': province.name
                });

                const s3blocks = [];
                const l2blocks = [];
                s3.map(block => {
                  s3blocks.push(block.bet);
                });
                l2.map(block => {
                  l2blocks.push(block.bet);
                });
                if (s3blocks.length !== 0 && l2blocks.length !== 0) {
                  res.json({
                    block: [
                      { msg: 'L2', blockNumber: l2blocks.toString() },
                      { msg: 'S3', blockNumber: s3blocks.toString() }
                    ]
                  });
                }
              }
              const blocks = [];
              blocking.map(block => {
                blocks.push(block.bet);
              });
              if (blocks.length !== 0) {
                res.json({
                  block: [{ msg: getBlockType, blockNumber: blocks.toString() }]
                });
              }
            }
          }
        }
      }
    } else {
      res.json({ block: [{ msg: 'Unregistered Phone Number' }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/bets/result/:coordinator_id
// @desc     Results on Coordinator
// @access   Private
router.get('/result/:coordinator_id', async (req, res) => {
  const date1 = new Date(getDateToday());
  date1.setDate(date1.getDate() + 1);

  try {
    const result = await Bet.find({
      date: {
        $gte: getDateToday(),
        $lte: date1
      },
      coordinator: req.params.coordinator_id,
      isWinner: true
    }).populate('collector', 'name');

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/payout', async (req, res) => {
  try {
    const payout = await Bet.find({
      isWinner: true,
      isPaid: false
    })
      .populate('collector', 'name')
      .populate('coordinator', 'name')
      .populate('location.town', 'name')
      .populate('location.station', 'name');

    res.json(payout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/payout/:id', async (req, res) => {
  try {
    const payout = await Bet.findOneAndUpdate(
      { _id: req.params.id },
      { isPaid: true },
      { new: true }
    );

    res.json(payout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const today = new Date(),
  oneDay = 1000 * 60 * 60 * 24,
  thirtyDays = new Date(today.valueOf() - 30 * oneDay),
  fifteenDays = new Date(today.valueOf() - 15 * oneDay),
  sevenDays = new Date(today.valueOf() - 7 * oneDay),
  dayOne = new Date(today.valueOf() - 0.45 * oneDay);

// @route    GET api/bets/:coordinator_id
// @desc     GET the bets of coordinators' collectors
// @access   Private
router.get('/data/:coordinator_id/:date', async (req, res) => {
  try {
    const date1 = new Date(req.params.date);
    date1.setDate(date1.getDate() + 1);

    const collectors = await Collector.find({
      coordinator: req.params.coordinator_id
    });

    const coordinators = await Coordinator.find({
      _id: req.params.coordinator_id
    });

    const id = [];
    if (collectors) {
      collectors.map(collector => {
        id.push(collector._id);
      });
      const bets = await Bet.find({
        date: {
          $gte: req.params.date,
          $lte: date1
        },
        collector: id
      })
        .sort({ date: -1 })
        .select('amount');

      const amounts = [];

      const data = {
        totalAmount: 0,
        percentage: 0,
        stationId: ''
      };
      bets.map(bet => {
        amounts.push(bet.amount);
      });

      if (amounts.length !== 0) {
        data.totalAmount = amounts.reduce(sum);
      }
      data.stationId = coordinators[0].stationId;
      data.percentage = coordinators[0].percentage;

      res.json(data);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/bets/:coordinator_id/:date
// @desc     GET the bets of coordinators' collectors
// @access   Private
router.get('/:coordinator_id/:date', async (req, res) => {
  try {
    const collectors = await Collector.find({
      coordinator: req.params.coordinator_id
    });

    const id = [];
    if (collectors) {
      collectors.map(collector => {
        id.push(collector._id);
      });
      const bets = await Bet.find({
        date: {
          $gte: req.params.date
        },
        collector: id
      })
        .sort({ date: -1 })
        .populate('collector', 'name');
      res.json(bets);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/bets/:coordinator_id/:date/:mobile
// @desc     GET the bets of coordinators' collectors
// @access   Private
router.get('/:coordinator_id/:date/:collector', async (req, res) => {
  try {
    const collectors = await Collector.find({
      coordinator: req.params.coordinator_id
    });

    if (collectors) {
      const bets = await Bet.find({
        date: {
          $gte: req.params.date
        },
        collector: req.params.collector
      })
        .select('amount')
        .sort({ date: -1 })
        .populate('collector');
      const amounts = [];
      const data = {
        date: req.params.date,
        totalAmount: 0,
        collectorID: '',
        percentage: 0,
        totalNet: 0,
        deduction: 0
      };
      bets.map(bet => {
        amounts.push(bet.amount);
        data.collectorID = bet.collector._id;
        data.percentage = bet.collector.percentage;
      });
      if (amounts.length !== 0) {
        data.totalAmount = amounts.reduce(sum);
      }
      data.deduction = computeDeduction(data.totalAmount, data.percentage);
      data.totalNet = computeTotalNet(data.totalAmount, data.deduction);
      res.json(data);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/bets/:type
// @desc     Update bet
// @access   Private
router.post('/:type', async (req, res) => {
  const date1 = new Date(getDateToday());
  date1.setDate(date1.getDate() + 1);

  const {
    type,
    gameNumber,
    bet,
    province,
    town,
    station,
    multiplyer
  } = req.body;

  const data = {
    bet: null,
    winner: 0,
    total: 0
  };

  const amounts = [];

  try {
    const bets = await Bet.find({
      date: {
        $gte: getDateToday(),
        $lte: date1
      },
      type,
      game: gameNumber,
      bet,
      'location.province': province.split('&')[1],
      'location.town': town.split('&')[0],
      'location.station': station.split('&')[0]
    });
    if (bets) {
      const update = await Bet.updateMany(
        {
          date: {
            $gte: getDateToday(),
            $lte: date1
          },
          type,
          game: gameNumber,
          bet,
          'location.province': province.split('&')[1],
          'location.town': town.split('&')[0],
          'location.station': station.split('&')[0]
        },
        {
          $set: { isWinner: true }
        }
      );

      async.eachSeries(
        bets,
        function updateBet(bet, done) {
          Bet.updateOne(
            { _id: bet._id },
            { $set: { winning: bet.amount * multiplyer } },
            done
          );
        },
        async function allDone(err) {
          // this will be called when all the updates are done or an error occurred during the iteration
          if (!err) {
            if (update.nModified > 0) {
              const winners = await Bet.find({
                date: {
                  $gte: getDateToday(),
                  $lte: date1
                },
                isWinner: true
              })
                .populate('collector', 'name')
                .populate('location.station', 'name')
                .populate('location.town', 'name');

              bets.map(bet => {
                amounts.push(bet.amount);
              });

              if (amounts.length !== 0) {
                data.total = amounts.reduce(sum);
              }

              data.winner = update.nModified;
              data.bet = winners;
            } else {
              data.winner = 0;
              data.total = 0;
            }
          }

          console.log('data', data);

          res.json(data);
        }
      );
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const sum = (total, num) => {
  return total + num;
};

const computeDeduction = (total, percentage) => {
  return total * (percentage / 100);
};

const computeTotalNet = (total, deduction) => {
  return total - deduction;
};

module.exports = router;
