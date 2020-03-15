import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';

import CoordinatorAuthContext from '../../../context/coordinatorAuth/coordinatorAuthContext';
import AlertContext from '../../../context/alert/alertContext';

const CoordinatorLogin = props => {
  const alertContext = useContext(AlertContext);
  const coordinatorAuthContext = useContext(CoordinatorAuthContext);

  const { setAlert } = alertContext;
  const {
    loginCoordinator,
    error,
    isCoordinator,
    clearErrors
  } = coordinatorAuthContext;

  const [coordinator, setCoordinator] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    if (isCoordinator) {
      props.history.push('/coordinator/dashboard');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isCoordinator, props.history]);

  const { username, password } = coordinator;

  const onChange = e =>
    setCoordinator({ ...coordinator, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (username === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      loginCoordinator({
        username,
        password
      });
    }
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="4">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={onSubmit}>
                    <h1>Login Coordinator</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">
                          Login as Coordinator
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CoordinatorLogin;
