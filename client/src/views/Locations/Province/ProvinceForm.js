import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import ProvinceContext from '../../../context/province/provinceContext';

const ProvinceForm = () => {
  const provinceContext = useContext(ProvinceContext);

  const {
    addProvince,
    current,
    clearProvinceCurrent,
    updateProvince
  } = provinceContext;

  const [province, setProvince] = useState({
    name: ''
  });

  useEffect(() => {
    if (current !== null) {
      setProvince(current);
    } else {
      setProvince({
        name: ''
      });
    }
  }, [provinceContext, current]);

  const { name } = province;

  const onChange = e =>
    setProvince({ ...province, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null && name !== '') {
      addProvince(province);
    } else {
      updateProvince(province);
    }

    clear();
  };

  const clear = () => {
    clearProvinceCurrent();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="Name">Name of Province</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
            />
          </FormGroup>
          <Button outline color="primary">
            {current ? 'Update Province' : 'Add Province'}
          </Button>
          {'  '}
          {current && (
            <Button outline color="secondary" onClick={clear}>
              Clear
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default ProvinceForm;
