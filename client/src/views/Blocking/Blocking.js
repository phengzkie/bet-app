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
import DatePicker from 'react-datepicker';

import ProvinceList from '../Locations/Province/ProvinceList';

import AlertContext from '../../context/alert/alertContext';
import BlockingContext from '../../context/blocking/blockingContext';

const Blocking = () => {
  const alertContext = useContext(AlertContext);
  const blockingContext = useContext(BlockingContext);

  const { setAlert } = alertContext;
  const { addBlocking, blockings, getBlocking, loading } = blockingContext;

  const [game, setGame] = useState({
    type: '',
    blockCombination: ''
  });

  const [location, setLocation] = useState({
    province: ''
  });

  const [date, setDate] = useState({
    startDate: '',
    dateSelect: ''
  });

  const { startDate, dateSelect } = date;

  const { province } = location;
  const { type, blockCombination } = game;

  useEffect(() => {
    if (blockings !== null) {
      getBlocking();
    }

    // eslint-disable-next-line
  }, []);

  const convertDate = date => {
    var today = date;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var convertedDate = new Date(today);

    return convertedDate.toISOString();
  };

  const onChange = e => {
    setGame({ ...game, [e.target.name]: e.target.value });
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleChange = date => {
    setDate({ startDate: date, dateSelect: convertDate(date) });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (type !== '' && blockCombination !== '' && province !== '') {
      addBlocking(game, location, dateSelect);
      setGame({
        type: '',
        gameNumber: '',
        blockCombination: ''
      });
      setLocation({
        province: ''
      });

      setAlert('Blocking Combination Added', 'success');
    } else {
      setAlert('All fields are required', 'danger');
    }
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>Set Blocking</h1>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" sm="6" lg="4">
                  Select Date:{'  '}
                  <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    minDate={new Date()}
                    placeholderText="Click to select a date"
                    dateFormat="MMMM d, yyyy"
                  />
                  <br></br>
                  <br></br>
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
                </Col>
                {/*
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
                      <TownList province={province.split(' ')[0]} />
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
                      <StationList town={town} />
                    </Input>
                  </FormGroup>
                </Col> */}
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
                  {/* <FormGroup className="text-center">
                    <Card>
                      <Label for="exampleSelect">Select Game Number</Label>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="gameNumber"
                            value="G1"
                            checked={gameNumber === 'G1'}
                            onChange={onChange}
                          />{' '}
                          Game 1
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="gameNumber"
                            value="G2"
                            checked={gameNumber === 'G2'}
                            onChange={onChange}
                          />{' '}
                          Game 2
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="gameNumber"
                            value="G3"
                            checked={gameNumber === 'G3'}
                            onChange={onChange}
                          />{' '}
                          Game 3
                        </Label>
                      </FormGroup>
                    </Card>
                  </FormGroup> */}
                </Col>
                <Col xs="12" sm="6" lg="4">
                  <FormGroup className="text-center">
                    <Label for="winning-bet">Enter Block Combination</Label>
                    <Input
                      type="text"
                      name="blockCombination"
                      value={blockCombination}
                      placeholder="e.g 0-0"
                      onChange={onChange}
                    />
                    <br />
                    <Button color="primary" size="lg" onClick={onSubmit}>
                      Submit Blocking
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
              <h3>Today's Hot Combination Number</h3>
            </CardHeader>
            {blockings !== null && !loading ? (
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Area</th>
                      <th scope="col">Game</th>
                      <th scope="col">Hot Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockings.map(blocking => (
                      <tr key={blocking._id}>
                        <td>{blocking.location.province}</td>
                        <td>{blocking.type}</td>
                        <td>{blocking.bet}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            ) : (
              <CardBody>No Hot Combination Number Today</CardBody>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Blocking;
