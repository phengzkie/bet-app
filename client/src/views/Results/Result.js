import React, { useState, useContext, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Button,
  FormGroup,
  Label,
  Table
} from 'reactstrap';

import Moment from 'react-moment';

import ProvinceList from '../Locations/Province/ProvinceList';
import TownList from '../Locations/Town/TownList';
import StationList from '../Locations/Station/StationList';

import BetContext from '../../context/bet/betContext';
import AlertContext from '../../context/alert/alertContext';

const Results = () => {
  const betContext = useContext(BetContext);
  const alertContext = useContext(AlertContext);

  const { updateBet, update } = betContext;
  const { setAlert } = alertContext;

  const [game, setGame] = useState({
    type: '',
    gameNumber: '',
    bet: '',
    multiplyer: ''
  });

  const [location, setLocation] = useState({
    province: '',
    town: '',
    station: ''
  });

  const { type, gameNumber, bet, multiplyer } = game;
  const { province, town, station } = location;

  const onChange = e => {
    setGame({ ...game, [e.target.name]: e.target.value });
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (
      type !== '' &&
      gameNumber !== '' &&
      bet !== '' &&
      multiplyer !== '' &&
      province !== '' &&
      town !== '' &&
      station !== ''
    ) {
      updateBet(game, location);
      setGame({
        type: '',
        gameNumber: '',
        bet: '',
        multiplyer: ''
      });
      setLocation({
        province: '',
        town: '',
        station: ''
      });
    } else {
      setAlert('All fields are required', 'danger');
    }
  };

  useEffect(() => {
    if (update !== null) {
      console.log(update.winner);
      console.log(update);
    }
  }, [update]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>Results</h1>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" sm="6" lg="4">
                  <FormGroup className="text-center">
                    <Label for="exampleSelect">Select Locations</Label>
                    <Input
                      type="select"
                      name="province"
                      value={province}
                      onChange={onChange}
                    >
                      <option value="" disabled>
                        Select Province
                      </option>
                      <ProvinceList />
                    </Input>
                  </FormGroup>

                  <FormGroup className="text-center">
                    <Input
                      type="select"
                      name="town"
                      value={town}
                      onChange={onChange}
                    >
                      <option value="" disabled>
                        Select Town
                      </option>
                      <TownList province={province.split('&')[0]} />
                    </Input>
                  </FormGroup>

                  <FormGroup className="text-center">
                    <Input
                      type="select"
                      name="station"
                      value={station}
                      onChange={onChange}
                    >
                      <option value="" disabled>
                        Select Station
                      </option>
                      <StationList town={town.split('&')[0]} />
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" lg="4">
                  <FormGroup className="text-center">
                    <Label for="exampleSelect">Select The Game</Label>
                    <Input
                      type="select"
                      name="type"
                      value={type}
                      onChange={onChange}
                    >
                      <option value="" disabled>
                        Select Game
                      </option>
                      <option key="S1" value="S1">
                        S1
                      </option>
                      <option key="S2" value="S2">
                        S2
                      </option>
                      <option key="S3" value="S3">
                        S3
                      </option>
                      <option key="L2" value="L2">
                        L2
                      </option>
                    </Input>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Card>
                      <Label for="exampleSelect" className="text-center">
                        Select Game Number
                      </Label>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="gameNumber"
                            value="AM"
                            checked={gameNumber === 'AM'}
                            onChange={onChange}
                          />
                          AM
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="gameNumber"
                            value="PM"
                            checked={gameNumber === 'PM'}
                            onChange={onChange}
                          />
                          PM
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="gameNumber"
                            value="EXTRA"
                            checked={gameNumber === 'EXTRA'}
                            onChange={onChange}
                          />
                          EXTRA
                        </Label>
                      </FormGroup>
                    </Card>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" lg="4">
                  <FormGroup className="text-center">
                    <Label for="winning-bet">Enter Winning Combination</Label>
                    <Input
                      type="text"
                      name="bet"
                      value={bet}
                      placeholder="e.g 0-0"
                      onChange={onChange}
                    />
                    <br />
                    <Label for="multiplyer">Enter Multiplyer( Tama )</Label>
                    <Input
                      type="text"
                      name="multiplyer"
                      value={multiplyer}
                      placeholder="e.g 800"
                      onChange={onChange}
                    />
                    <br />
                    <Button color="primary" size="lg" onClick={onSubmit}>
                      Submit Result
                    </Button>{' '}
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>
                {update !== null ? `Winner/s: ${update.winner}` : ``}
                <br />
                {update !== null ? `Total: ${update.total}` : ``}
              </h1>
            </CardHeader>
            {update !== null && update.winner > 0 ? (
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Collector</th>
                      <th scope="col">Bet</th>
                      <th scope="col">Game</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Location</th>
                      <th scope="col">Winning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {update.bet.map(bet => (
                      <tr key={bet._id}>
                        <td>
                          <div>
                            <Moment format="MMMM Do YYYY">{bet.date}</Moment>
                          </div>
                          <div className="small text-muted">
                            <Moment format="h:mm:ss A">{bet.date}</Moment>
                          </div>
                        </td>
                        <td>{bet.collector.name}</td>
                        <td>{bet.bet}</td>
                        <td>{bet.game}</td>
                        <td>{bet.amount}</td>
                        <td>
                          {bet.location.station.name}, {bet.location.town.name}
                        </td>
                        <td>{bet.winning}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            ) : (
              ''
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Results;
