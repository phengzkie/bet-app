const express = require('express');
const router = express.Router();

const Bet = require('../models/Bet');
const Coordinator = require('../models/Coordinator');
const Station = require('../models/Station');
const Town = require('../models/Town');
const Province = require('../models/Province');

const getToday = require('../client/src/functions/getDate');

const mongoose = require('mongoose');

//Total per stations
router.get('/station/:station_id/:date', async (req, res) => {
  try {
    const coordinators = await Coordinator.find({
      stationId: req.params.station_id
    });

    const date1 = new Date(req.params.date);
    date1.setDate(date1.getDate() + 1);

    if (coordinators) {
      const stations = await Station.find({
        _id: req.params.station_id
      });

      const coor_ids = [];

      coordinators.map(coor => {
        coor_ids.push(coor._id);
      });

      if (stations) {
        const bets = await Bet.find({
          date: {
            $gte: req.params.date,
            $lte: date1
          },
          'location.station': req.params.station_id
        });

        if (bets) {
          const amounts = [];
          const percentages = [];
          const gameOneAmounts = [];
          const gameTwoAmounts = [];
          const gameThreeAmounts = [];
          const gameOneWinnings = [];
          const gameTwoWinnings = [];
          const gameThreeWinnings = [];

          const data = {
            totalAmount: 0,
            percentage: 0,
            coordinatorsPercentage: 0,
            deduction: 0,
            totalNet: 0,
            totalWin: 0,
            totalKabig: 0,
            totalTapada: 0,
            gameOneTotal: 0,
            gameOneDeduction: 0,
            gameOneNet: 0,
            gameOneWin: 0,
            gameOneKabig: 0,
            gameOneTapada: 0,
            gameTwoTotal: 0,
            gameTwoDeduction: 0,
            gameTwoNet: 0,
            gameTwoWin: 0,
            gameTwoKabig: 0,
            gameTwoTapada: 0,
            gameThreeTotal: 0,
            gameThreeDeduction: 0,
            gameThreeNet: 0,
            gameThreeWin: 0,
            gameThreeKabig: 0,
            gameThreeTapada: 0
          };
          bets.map(bet => {
            amounts.push(bet.amount);
          });

          coordinators.map(coordinator => {
            percentages.push(coordinator.percentage);
          });

          if (percentages.length !== 0) {
            data.coordinatorsPercentage =
              percentages.reduce(sum) / percentages.length;
          }

          if (amounts.length !== 0) {
            data.totalAmount = amounts.reduce(sum);
          }
          data.percentage = stations[0].percentage;

          // Game One
          const gameOne = await Bet.find({
            date: {
              $gte: req.params.date,
              $lte: date1
            },
            'location.station': req.params.station_id,
            game: 'AM'
          });
          if (gameOne) {
            gameOne.map(one => {
              gameOneAmounts.push(one.amount);
              gameOneWinnings.push(one.winning);
            });
            if (gameOneAmounts.length !== 0) {
              data.gameOneTotal = gameOneAmounts.reduce(sum);

              data.gameOneDeduction = computeDeductionPerGame(
                data.gameOneTotal,
                data.percentage
              );

              data.gameOneNet = computeTotalNetPerGame(
                data.gameOneTotal,
                data.gameOneDeduction
              );
            }

            if (gameOneWinnings.length !== 0) {
              data.gameOneWin = gameOneWinnings.reduce(sum);

              if (data.gameOneNet > data.gameOneWin) {
                data.gameOneKabig = data.gameOneNet - data.gameOneWin;
              }
              if (data.gameOneNet < data.gameOneWin) {
                data.gameOneTapada = data.gameOneWin - data.gameOneNet;
              }
            }
          }

          // Game Two
          const gameTwo = await Bet.find({
            date: {
              $gte: req.params.date,
              $lte: date1
            },
            'location.station': req.params.station_id,
            game: 'PM'
          });
          if (gameTwo) {
            gameTwo.map(two => {
              gameTwoAmounts.push(two.amount);
              gameTwoWinnings.push(two.winning);
            });
            if (gameTwoAmounts.length !== 0) {
              data.gameTwoTotal = gameTwoAmounts.reduce(sum);

              data.gameTwoDeduction = computeDeductionPerGame(
                data.gameTwoTotal,
                data.percentage
              );

              data.gameTwoNet = computeTotalNetPerGame(
                data.gameTwoTotal,
                data.gameTwoDeduction
              );
            }

            if (gameTwoWinnings.length !== 0) {
              data.gameTwoWin = gameTwoWinnings.reduce(sum);

              if (data.gameTwoNet > data.gameTwoWin) {
                data.gameTwoKabig = data.gameTwoNet - data.gameTwoWin;
              }
              if (data.gameTwoNet < data.gameTwoWin) {
                data.gameTwoTapada = data.gameTwoWin - data.gameTwoNet;
              }
            }
          }

          // Game Three
          const gameThree = await Bet.find({
            date: {
              $gte: req.params.date,
              $lte: date1
            },
            'location.station': req.params.station_id,
            game: 'EXTRA'
          });
          if (gameThree) {
            gameThree.map(three => {
              gameThreeAmounts.push(three.amount);
              gameThreeWinnings.push(three.winning);
            });
            if (gameThreeAmounts.length !== 0) {
              data.gameThreeTotal = gameThreeAmounts.reduce(sum);

              data.gameThreeDeduction = computeDeductionPerGame(
                data.gameThreeTotal,
                data.percentage
              );

              data.gameThreeNet = computeTotalNetPerGame(
                data.gameThreeTotal,
                data.gameThreeDeduction
              );
            }

            if (gameThreeWinnings.length !== 0) {
              data.gameThreeWin = gameThreeWinnings.reduce(sum);

              if (data.gameThreeNet > data.gameThreeWin) {
                data.gameThreeKabig = data.gameThreeNet - data.gameThreeWin;
              }
              if (data.gameThreeNet < data.gameThreeWin) {
                data.gameThreeTapada = data.gameThreeWin - data.gameThreeNet;
              }
            }
          }

          data.deduction = computeTotalDeduction(
            data.gameOneDeduction,
            data.gameTwoDeduction,
            data.gameThreeDeduction
          );

          data.totalNet = computeTotalNet(
            data.gameOneNet,
            data.gameTwoNet,
            data.gameThreeNet
          );

          data.totalWin = computeTotalWin(
            data.gameOneWin,
            data.gameTwoWin,
            data.gameThreeWin
          );

          if (data.totalNet > data.totalWin) {
            data.totalKabig = computeTotalKabig(
              data.gameOneKabig,
              data.gameTwoKabig,
              data.gameThreeKabig
            );
          }

          if (data.totalNet < data.totalWin) {
            data.totalTapada = computeTotalTapada(
              data.gameOneTapada,
              data.gameTwoTapada,
              data.gameThreeTapada
            );
          }

          res.json(data);
        }
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Total per town
router.get('/town/:town_id/:date', async (req, res) => {
  try {
    const date1 = new Date(req.params.date);
    date1.setDate(date1.getDate() + 1);

    const town = await Town.find({
      _id: req.params.town_id
    });

    if (town) {
      const station_ids = [];
      const station_percentage = [];
      const coordinator_percentage = [];
      const stations = await Station.find({
        townId: req.params.town_id
      });

      stations.map(station => {
        station_ids.push(station._id);
        station_percentage.push(station.percentage);
      });

      if (stations) {
        const coordinators = await Coordinator.find({
          stationId: station_ids
        });

        coordinators.map(coordinator => {
          coordinator_percentage.push(coordinator.percentage);
        });

        const bets = await Bet.aggregate([
          {
            $match: {
              date: {
                $gt: new Date(req.params.date),
                $lt: new Date(date1)
              }
            }
          },
          {
            $match: {
              'location.town': new mongoose.Types.ObjectId(req.params.town_id)
            }
          },
          {
            $group: {
              _id: '$location.station',
              total: { $sum: '$amount' },
              winning: { $sum: '$winning' }
            }
          }
        ]);

        const townData = await Station.populate(bets, { path: '_id' });

        const data = {
          town: null,
          gross: 0,
          pay: 0,
          net: 0,
          winning: 0,
          kabig: 0,
          tapada: 0
        };

        const gross = [];
        const pay = [];
        const winning = [];

        const tData = townData.map(town => {
          gross.push(town.total);
          pay.push(computeDeductionPerGame(town.total, town._id.percentage));
          winning.push(town.winning);

          var lose = 0;
          var win = 0;

          let net =
            town.total -
            computeDeductionPerGame(town.total, town._id.percentage);

          if (net > town.winning) {
            win = net - town.winning;
          }

          if (town.winning > net) {
            lose = town.winning - net;
          }

          return {
            _id: town._id._id,
            name: town._id.name,
            gross: town.total,
            deduction: computeDeductionPerGame(town.total, town._id.percentage),
            net:
              town.total -
              computeDeductionPerGame(town.total, town._id.percentage),
            payout: town.winning,
            win: win,
            lose: lose
          };
        });

        data.town = tData;

        if (gross.length !== 0) {
          data.gross = gross.reduce(sum);
        }

        if (pay.length !== 0) {
          data.pay = pay.reduce(sum);
        }

        data.net = data.gross - data.pay;

        if (winning.length !== 0) {
          data.winning = winning.reduce(sum);
        }

        if (data.net > data.winning) {
          data.kabig = data.net - data.winning;
        }

        if (data.net < data.winning) {
          data.tapada = data.winning - data.net;
        }

        res.json(data);
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Total per province
router.get('/province/:province/:date', async (req, res) => {
  try {
    const date1 = new Date(req.params.date);
    date1.setDate(date1.getDate() + 1);

    const province = await Province.find({
      name: req.params.province
    });

    if (province) {
      const bets = await Bet.aggregate([
        {
          $match: {
            date: {
              $gt: new Date(req.params.date),
              $lt: new Date(date1)
            }
          }
        },
        {
          $match: {
            'location.province': req.params.province
          }
        },
        {
          $group: {
            _id: {
              town: '$location.town',
              station: '$location.station'
            },
            total: { $sum: '$amount' },
            winning: { $sum: '$winning' }
          }
        },
        {
          $group: {
            _id: '$_id.town',
            data: {
              $push: {
                station: '$_id.station',
                total: '$total',
                winning: '$winning'
              }
            }
          }
        }
      ]);
      await Town.populate(bets, { path: '_id' });
      await Station.populate(bets, { path: 'data.station' });

      const data = {
        towns: null,
        gross: 0,
        pay: 0,
        net: 0,
        winning: 0,
        kabig: 0,
        tapada: 0
      };

      const pData = bets.map(town => {
        const gr = [];
        const winning = [];
        const pay = [];

        town.data.map(t => {
          gr.push(t.total);
          winning.push(t.winning);
          pay.push(computeDeductionPerGame(t.total, t.station.percentage));
        });

        if (gr.length !== 0) {
          town.total = gr.reduce(sum);
        }

        if (winning.length !== 0) {
          town.winning = winning.reduce(sum);
        }

        if (pay.length !== 0) {
          town.pay = pay.reduce(sum);
        }

        town.net = town.total - town.pay;

        var lose = 0;
        var win = 0;

        if (town.net > town.winning) {
          win = town.net - town.winning;
        }

        if (town.net < town.winning) {
          lose = town.winning - town.net;
        }

        return {
          _id: town._id._id,
          name: town._id.name,
          gross: town.total,
          deduction: town.pay,
          net: town.net,
          payout: town.winning,
          win: win,
          lose: lose
        };
      });

      data.towns = pData;

      const gross = [];
      const pay = [];
      const winning = [];

      bets.map(bet =>
        bet.data.map(bd => {
          gross.push(bd.total);
          winning.push(bd.winning);
          pay.push(computeDeductionPerGame(bd.total, bd.station.percentage));

          let net =
            bd.total - computeDeductionPerGame(bd.total, bd.station.percentage);

          if (net > bd.winning) {
            win = net - bd.winning;
          }

          if (bd.winning > net) {
            lose = bd.winning - net;
          }
        })
      );

      if (gross.length !== 0) {
        data.gross = gross.reduce(sum);
      }

      if (pay.length !== 0) {
        data.pay = pay.reduce(sum);
      }

      data.net = data.gross - data.pay;

      if (winning.length !== 0) {
        data.winning = winning.reduce(sum);
      }

      if (winning.length !== 0) {
        data.winning = winning.reduce(sum);
      }

      if (data.net > data.winning) {
        data.kabig = data.net - data.winning;
      }

      if (data.net < data.winning) {
        data.tapada = data.winning - data.net;
      }
      res.json(data);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Total amounts
router.get('/', async (req, res) => {
  try {
    const date1 = new Date(getToday());
    date1.setDate(date1.getDate() + 1);

    const wk = new Date(getToday());
    wk.setDate(wk.getDate() - 7);

    const mo = new Date(getToday());
    mo.setDate(mo.getDate() - 30);

    const wk1 = new Date(getToday());
    wk1.setDate(wk1.getDate() - 5);

    const wk2 = new Date(getToday());
    wk2.setDate(wk2.getDate() - 4);

    const wk3 = new Date(getToday());
    wk3.setDate(wk3.getDate() - 3);

    const wk4 = new Date(getToday());
    wk4.setDate(wk4.getDate() - 2);

    const wk5 = new Date(getToday());
    wk5.setDate(wk5.getDate() - 1);

    const bets = await Bet.find({
      date: {
        $gte: getToday(),
        $lte: date1
      }
    });
    if (bets) {
      const amounts = [];
      const weekAmounts = [];
      const monthAmounts = [];
      const weekDay1Amounts = [];
      const weekDay2Amounts = [];
      const weekDay3Amounts = [];
      const weekDay4Amounts = [];
      const data = {
        totalAmount: 0,
        weekDay1Amount: 0,
        weekDay2Amount: 0,
        weekDay3Amount: 0,
        weekDay4Amount: 0,
        weekAmount: 0,
        monthAmount: 0
      };
      bets.map(bet => {
        amounts.push(bet.amount);
      });

      if (amounts.length !== 0) {
        data.totalAmount = amounts.reduce(sum);
      }

      // weekDay1
      const weekDay1 = await Bet.find({
        date: {
          $gte: wk2,
          $lte: wk3
        }
      });

      if (weekDay1) {
        weekDay1.map(wk2 => {
          weekDay1Amounts.push(wk2.amount);
        });

        if (weekDay1Amounts.length !== 0) {
          data.weekDay1Amount = weekDay1Amounts.reduce(sum);
        }
      }

      // weekDay2
      const weekDay2 = await Bet.find({
        date: {
          $gte: wk3,
          $lte: wk4
        }
      });

      if (weekDay2) {
        weekDay2.map(wk3 => {
          weekDay2Amounts.push(wk3.amount);
        });

        if (weekDay2Amounts.length !== 0) {
          data.weekDay2Amount = weekDay2Amounts.reduce(sum);
        }
      }

      // weekDay3
      const weekDay3 = await Bet.find({
        date: {
          $gte: wk4,
          $lte: wk5
        }
      });

      if (weekDay3) {
        weekDay3.map(wk3 => {
          weekDay3Amounts.push(wk3.amount);
        });

        if (weekDay3Amounts.length !== 0) {
          data.weekDay3Amount = weekDay3Amounts.reduce(sum);
        }
      }

      // weekDay4
      const weekDay4 = await Bet.find({
        date: {
          $gte: wk5,
          $lte: getToday()
        }
      });

      if (weekDay4) {
        weekDay4.map(wk4 => {
          weekDay4Amounts.push(wk4.amount);
        });

        if (weekDay4Amounts.length !== 0) {
          data.weekDay4Amount = weekDay4Amounts.reduce(sum);
        }
      }

      // // last 7 days
      const weekAmount = await Bet.find({
        date: {
          $gte: wk
        }
      });

      if (weekAmount) {
        weekAmount.map(wa => {
          weekAmounts.push(wa.amount);
        });

        if (weekAmounts.length !== 0) {
          data.weekAmount = weekAmounts.reduce(sum);
        }
      }

      // // last 30 days
      const monthAmount = await Bet.find({
        date: {
          $gte: mo
        }
      });

      if (monthAmount) {
        monthAmount.map(ma => {
          monthAmounts.push(ma.amount);
        });

        if (monthAmounts.length !== 0) {
          data.monthAmount = monthAmounts.reduce(sum);
        }
      }

      res.json(data);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const sum = (total, num) => {
  return total + num;
};

const computeDeductionPerGame = (total, percentage) => {
  return total * (percentage / 100);
};

const computeTotalNetPerGame = (total, deduction) => {
  return total - deduction;
};

const computeTotalDeduction = (g1, g2, g3) => {
  return g1 + g2 + g3;
};

const computeTotalNet = (g1, g2, g3) => {
  return g1 + g2 + g3;
};

const computeTotalWin = (g1, g2, g3) => {
  return g1 + g2 + g3;
};

const computeTotalKabig = (g1, g2, g3) => {
  return g1 + g2 + g3;
};

const computeTotalTapada = (g1, g2, g3) => {
  return g1 + g2 + g3;
};

module.exports = router;
