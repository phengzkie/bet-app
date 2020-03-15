import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import StationSelectOptions from '../Locations/Station/StationSelectOptions';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label
} from 'reactstrap';

const AddCoordinator = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { registerCoordinator, error, clearErrors } = authContext;

  useEffect(() => {
    if (error === 'Coordinator Already Exists') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const [coordinator, setCoordinator] = useState({
    username: '',
    name: '',
    email: '',
    mobile: '',
    stationId: '',
    station: '',
    percentage: '',
    password: '',
    password2: ''
  });

  const {
    username,
    name,
    email,
    mobile,
    station,
    percentage,
    password,
    password2
  } = coordinator;

  const onChange = e =>
    setCoordinator({ ...coordinator, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (
      name === '' ||
      username === '' ||
      mobile === '' ||
      station === '' ||
      password === '' ||
      percentage === ''
    ) {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else if (password.length < 6) {
      setAlert('Please enter a password with 6 or more characters', 'danger');
    } else {
      registerCoordinator({
        username,
        name,
        email,
        stationId: station.split('&')[0],
        station: station.split('&')[1],
        percentage,
        mobile,
        password
      });
      setAlert('Coordinator Added', 'success');
      clearFields();
    }
  };

  const clearFields = () =>
    setCoordinator({
      username: '',
      name: '',
      email: '',
      location: '',
      percentage: '',
      mobile: '',
      password: '',
      password2: ''
    });

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Register Coordinator
            </CardHeader>
            <CardBody>
              <Form onSubmit={onSubmit}>
                <p className="text-muted">Add Coordinator / Cabo</p>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-emotsmile" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-phone" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Mobile Number"
                    name="mobile"
                    value={mobile}
                    onChange={onChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Label for="exampleSelect">Select The Station</Label>
                </InputGroup>
                <InputGroup className="mb-3">
                  <Input
                    type="select"
                    name="station"
                    value={station}
                    onChange={onChange}
                  >
                    <option value="" disabled>
                      Select Station
                    </option>
                    <StationSelectOptions />
                  </Input>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>%</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Cut Percentage"
                    name="percentage"
                    value={percentage}
                    onChange={onChange}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    placeholder="Repeat password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                  />
                </InputGroup>
                <Button color="success" block>
                  Add Coordinator
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddCoordinator;
