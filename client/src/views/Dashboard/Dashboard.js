import React, { useEffect, useContext, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  CardTitle,
  CardText,
  Input,
  Table
} from 'reactstrap';

import { Pie, Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

// Context
import BetContext from '../../context/bet/betContext';

import ProvinceList from '../Locations/Province/ProvinceList';
import TownList from '../Locations/Town/TownList';
import StationList from '../Locations/Station/StationList';

const Dashboard = () => {
  const betContext = useContext(BetContext);

  const [province, setProvince] = useState({
    provinceId: ''
  });

  const [town, setTown] = useState({
    townId: ''
  });

  const [station, setStation] = useState({
    stationId: ''
  });

  const [date, setDate] = useState({
    startDate: new Date(),
    dateSelect: new Date()
  });

  const { provinceId } = province;
  const { townId } = town;
  const { stationId } = station;
  const { startDate, dateSelect } = date;

  const {
    getStationData,
    stationData,
    getTownData,
    townData,
    getProvinceData,
    provinceData,
    overAllData,
    getOverAllData,
    clearData
  } = betContext;

  const handleProvince = e => {
    // if (dateSelect === '') {
    //   setDate({ startDate: new Date(), dateSelect: convertDate(new Date()) });
    // }
    setProvince({ ...province, [e.target.name]: e.target.value });
    setTown({
      townId: ''
    });
    setStation({
      stationId: ''
    });
  };

  const handleTown = e => {
    setTown({ ...town, [e.target.name]: e.target.value });
    setStation({
      stationId: ''
    });
  };

  const handleStation = e => {
    if (townId !== '') {
      setStation({ ...station, [e.target.name]: e.target.value });
    }
  };

  const handleChange = date => {
    setDate({ startDate: date, dateSelect: date });
    setProvince({
      provinceId: ''
    });
    setTown({
      townId: ''
    });
    setStation({
      stationId: ''
    });
    clearData();
  };

  const convertDate = date => {
    var today = date;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var convertedDate = new Date(today);

    return convertedDate.toISOString();
  };

  useEffect(() => {
    getOverAllData();

    if (provinceId !== '') {
      getProvinceData(provinceId.split('&')[1], convertDate(dateSelect));
    }
    if (townId !== '') {
      getTownData(townId.split('&')[0], convertDate(dateSelect));
    }
    if (stationId !== '') {
      getStationData(stationId.split('&')[0], convertDate(dateSelect));
    }

    if (startDate === '') {
      clearData();
    }

    // eslint-disable-next-line
  }, [provinceId, townId, stationId]);

  const pie3 = {
    labels: ['G1', 'G2', 'G3'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const format = (n, currency) => {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  };

  const day = day => {
    return moment()
      .subtract(day, 'day')
      .startOf('day')
      .format('DD');
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card>
            <CardHeader>
              Select Date:{'  '}
              <DatePicker
                selected={startDate}
                onChange={handleChange}
                maxDate={new Date()}
                placeholderText="Click to select a date"
                dateFormat="MMMM d, yyyy"
              />
            </CardHeader>
            <CardBody>
              <Input
                type="select"
                name="provinceId"
                value={provinceId}
                onChange={handleProvince}
              >
                <option value="" disabled>
                  Select Province
                </option>
                <ProvinceList />
              </Input>
              <br />
              <Input
                type="select"
                name="townId"
                value={townId}
                onChange={handleTown}
              >
                <option value="" disabled>
                  Select Town
                </option>
                <TownList province={provinceId.split('&')[0]} />
              </Input>
              <br />
              <Input
                type="select"
                name="stationId"
                value={stationId}
                onChange={handleStation}
              >
                <option value="" disabled>
                  Select Station
                </option>
                <StationList town={townId.split('&')[0]} />
              </Input>
              <br />
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <div className="text-value">
                {overAllData !== null
                  ? `${format(overAllData.totalAmount, 'Php ')}`
                  : `Php ${0.0}`}
              </div>
              <div>Total Gross Today</div>
            </CardBody>
          </Card>
          <Card className="text-white bg-success">
            <CardBody className="pb-0">
              <div className="text-value">
                {overAllData !== null
                  ? `${format(overAllData.weekAmount, 'Php ')}`
                  : `Php ${0.0}`}
              </div>
              <div>Total Gross (Last 7 Days)</div>
            </CardBody>
          </Card>
          <Card className="text-white bg-warning">
            <CardBody className="pb-0">
              <div className="text-value">
                {overAllData !== null
                  ? `${format(overAllData.monthAmount, 'Php ')}`
                  : `Php ${0.0}`}
              </div>
              <div>Total Gross (Last 30 Days)</div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="4">
          <Card body outline color="secondary">
            <CardText>
              {overAllData !== null ? (
                <Bar
                  data={{
                    labels: [day(4), day(3), day(2), day(1), day(0)],
                    datasets: [
                      {
                        label: [`Gross of ` + moment().format('MMMM')],
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [
                          overAllData.weekDay1Amount,
                          overAllData.weekDay2Amount,
                          overAllData.weekDay3Amount,
                          overAllData.weekDay4Amount,
                          overAllData.totalAmount
                        ]
                      }
                    ]
                  }}
                />
              ) : (
                <Bar
                  data={{
                    labels: [day(4), day(3), day(2), day(1), day(0)],
                    datasets: [
                      {
                        label: [`Gross of ` + moment().format('MMMM')],
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [0, 0, 0, 0, 0, 0, 0]
                      }
                    ]
                  }}
                />
              )}
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <strong>Area Reports</strong>
            </CardHeader>

            <CardBody>
              <Row>
                <Col xs="12" sm="6" lg="8">
                  <strong>{provinceId.split('&')[1]}</strong>

                  {provinceId !== '' && provinceData !== null ? (
                    <Table bordered responsive size="sm" hover>
                      <thead className="thead-light">
                        <tr>
                          <th>Town</th>
                          <th>Gross</th>
                          <th>Deduction</th>
                          <th>Net</th>
                          <th>Pay Out</th>
                          <th>Win</th>
                          <th>Lose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {provinceData.towns.map(town => (
                          <tr key={town._id}>
                            <th>{town.name}</th>
                            <th>{town.gross.toFixed(2)}</th>
                            <th>{town.deduction.toFixed(2)}</th>
                            <th>{town.net.toFixed(2)}</th>
                            <th>{town.payout.toFixed(2)}</th>
                            <th>{town.win.toFixed(2)}</th>
                            <th>{town.lose.toFixed(2)}</th>
                          </tr>
                        ))}

                        <tr>
                          <th>TOTAL</th>
                          <th>{provinceData.gross.toFixed(2)}</th>
                          <th>{provinceData.pay.toFixed(2)}</th>
                          <th>{provinceData.net.toFixed(2)}</th>
                          <th>{provinceData.winning.toFixed(2)}</th>
                          <th>{provinceData.kabig.toFixed(2)}</th>
                          <th>{provinceData.tapada.toFixed(2)}</th>
                        </tr>
                      </tbody>
                    </Table>
                  ) : (
                    <Table bordered responsive size="sm" hover>
                      <thead className="thead-light">
                        <tr>
                          <th>Town</th>
                          <th>Gross</th>
                          <th>Deduction</th>
                          <th>Net</th>
                          <th>Pay Out</th>
                          <th>Win</th>
                          <th>Lose</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>TOTAL</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                        </tr>
                      </tbody>
                    </Table>
                  )}
                </Col>
              </Row>
            </CardBody>
            <hr className="mt-0" />
            <CardBody>
              <Row>
                <Col xs="12" sm="6" lg="8">
                  <strong>{townId.split('&')[1]}</strong>

                  {townId !== '' && townData !== null ? (
                    <Table bordered responsive size="sm" hover>
                      <thead className="thead-light">
                        <tr>
                          <th>Station</th>
                          <th>Gross</th>
                          <th>Deduction</th>
                          <th>Net</th>
                          <th>Pay Out</th>
                          <th>Win</th>
                          <th>Lose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {townData.town.map(town => (
                          <tr key={town._id}>
                            <th>{town.name}</th>
                            <th>{town.gross.toFixed(2)}</th>
                            <th>{town.deduction.toFixed(2)}</th>
                            <th>{town.net.toFixed(2)}</th>
                            <th>{town.payout.toFixed(2)}</th>
                            <th>{town.win.toFixed(2)}</th>
                            <th>{town.lose.toFixed(2)}</th>
                          </tr>
                        ))}

                        <tr>
                          <th>TOTAL</th>
                          <th>{townData.gross.toFixed(2)}</th>
                          <th>{townData.pay.toFixed(2)}</th>
                          <th>{townData.net.toFixed(2)}</th>
                          <th>{townData.winning.toFixed(2)}</th>
                          <th>{townData.kabig.toFixed(2)}</th>
                          <th>{townData.tapada.toFixed(2)}</th>
                        </tr>
                      </tbody>
                    </Table>
                  ) : (
                    <Table bordered responsive size="sm" hover>
                      <thead className="thead-light">
                        <tr>
                          <th>Station</th>
                          <th>Gross</th>
                          <th>Deduction</th>
                          <th>Net</th>
                          <th>Pay Out</th>
                          <th>Win</th>
                          <th>Lose</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>TOTAL</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                        </tr>
                      </tbody>
                    </Table>
                  )}
                </Col>
              </Row>
            </CardBody>
            <hr className="mt-0" />
            <CardBody>
              <Row>
                <Col xs="12" sm="6" lg="8">
                  <strong>{stationId.split('&')[1]}</strong>

                  {stationId !== '' && stationData !== null ? (
                    <Table bordered responsive size="sm" hover>
                      <thead className="thead-light">
                        <tr>
                          <th></th>
                          <th>Gross</th>
                          <th>Deduction</th>
                          <th>Net</th>
                          <th>Pay Out</th>
                          <th>Win</th>
                          <th>Lose</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>AM</th>
                          <th>{stationData.gameOneTotal.toFixed(2)}</th>
                          <th>{stationData.gameOneDeduction.toFixed(2)}</th>
                          <th>{stationData.gameOneNet.toFixed(2)}</th>
                          <th>{stationData.gameOneWin.toFixed(2)}</th>
                          <th>{stationData.gameOneKabig.toFixed(2)}</th>
                          <th>{stationData.gameOneTapada.toFixed(2)}</th>
                        </tr>
                        <tr>
                          <th>PM</th>
                          <th>{stationData.gameTwoTotal.toFixed(2)}</th>
                          <th>{stationData.gameTwoDeduction.toFixed(2)}</th>
                          <th>{stationData.gameTwoNet.toFixed(2)}</th>
                          <th>{stationData.gameTwoWin.toFixed(2)}</th>
                          <th>{stationData.gameTwoKabig.toFixed(2)}</th>
                          <th>{stationData.gameTwoTapada.toFixed(2)}</th>
                        </tr>
                        <tr>
                          <th>EXTRA</th>
                          <th>{stationData.gameThreeTotal.toFixed(2)}</th>
                          <th>{stationData.gameThreeDeduction.toFixed(2)}</th>
                          <th>{stationData.gameThreeNet.toFixed(2)}</th>
                          <th>{stationData.gameThreeWin.toFixed(2)}</th>
                          <th>{stationData.gameThreeKabig.toFixed(2)}</th>
                          <th>{stationData.gameThreeTapada.toFixed(2)}</th>
                        </tr>
                        <tr>
                          <th>TOTAL</th>
                          <th>{stationData.totalAmount.toFixed(2)}</th>
                          <th>{stationData.deduction.toFixed(2)}</th>
                          <th>{stationData.totalNet.toFixed(2)}</th>
                          <th>{stationData.totalWin.toFixed(2)}</th>
                          <th>{stationData.totalKabig.toFixed(2)}</th>
                          <th>{stationData.totalTapada.toFixed(2)}</th>
                        </tr>
                      </tbody>
                    </Table>
                  ) : (
                    <Table bordered responsive size="sm" hover>
                      <thead className="thead-light">
                        <tr>
                          <th></th>
                          <th>Gross</th>
                          <th>Deduction</th>
                          <th>Net</th>
                          <th>Pay Out</th>
                          <th>Win</th>
                          <th>Lose</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>AM</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                        </tr>
                        <tr>
                          <th>PM</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                        </tr>
                        <tr>
                          <th>EXTRA</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                        </tr>
                        <tr>
                          <th>TOTAL</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                          <th>{0}</th>
                        </tr>
                      </tbody>
                    </Table>
                  )}
                </Col>
                <Col xs="12" sm="6" lg="4">
                  <Card body outline color="secondary">
                    <CardTitle>
                      <strong>Station</strong>
                    </CardTitle>
                    <CardText>
                      {stationData !== null && stationId !== '' ? (
                        <Pie
                          data={{
                            labels: ['G1', 'G2', 'G3'],
                            datasets: [
                              {
                                data: [
                                  stationData.gameOneTotal,
                                  stationData.gameTwoTotal,
                                  stationData.gameThreeTotal
                                ],
                                backgroundColor: [
                                  '#FF6384',
                                  '#36A2EB',
                                  '#FFCE56'
                                ],
                                hoverBackgroundColor: [
                                  '#FF6384',
                                  '#36A2EB',
                                  '#FFCE56'
                                ]
                              }
                            ]
                          }}
                        />
                      ) : (
                        <Pie data={pie3} />
                      )}
                    </CardText>
                  </Card>
                </Col>
                <Col xs="12" sm="6" lg="4">
                  <Row></Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
