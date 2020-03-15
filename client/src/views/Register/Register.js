import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

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

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors } = authContext;

  useEffect(() => {
    if (error === 'User Already Exists') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    mobile: '',
    location: '',
    role: '',
    password: '',
    password2: ''
  });

  const {
    username,
    name,
    email,
    mobile,
    location,
    role,
    password,
    password2
  } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (
      name === '' ||
      username === '' ||
      mobile === '' ||
      location === '' ||
      password === ''
    ) {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else if (password.length < 6) {
      setAlert('Please enter a password with 6 or more characters', 'danger');
    } else {
      register({
        username,
        name,
        email,
        location,
        role,
        mobile,
        password
      });
      setAlert('Register Success', 'success');
      clearFields();
    }
  };

  const clearFields = () =>
    setUser({
      username: '',
      name: '',
      email: '',
      location: '',
      mobile: '',
      role: '',
      password: '',
      password2: ''
    });

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Register
            </CardHeader>
            <CardBody>
              <Form onSubmit={onSubmit}>
                <p className="text-muted">Create an account</p>
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
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-location-pin" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={location}
                    onChange={onChange}
                  />
                </InputGroup>
                <InputGroup>
                  <Label for="role">Role : </Label>
                </InputGroup>
                <InputGroup>
                  <Input
                    type="select"
                    name="role"
                    value={role}
                    onChange={onChange}
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                  </Input>
                </InputGroup>
                <br />
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
                  Create Account
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
