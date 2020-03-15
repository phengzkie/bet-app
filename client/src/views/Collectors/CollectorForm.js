import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import CollectorContext from '../../context/collector/collectorContext';
import AlertContext from '../../context/alert/alertContext';

const CollectorForm = () => {
  const collectorContext = useContext(CollectorContext);
  const alertContext = useContext(AlertContext);

  const { addCollector, current, clearCollectorCurrent } = collectorContext;

  const { setAlert } = alertContext;

  const [collector, setCollector] = useState({
    name: '',
    mobile: '',
    percentage: ''
  });

  useEffect(() => {
    if (current !== null) {
      setCollector(current);
    } else {
      setCollector({
        name: '',
        mobile: '',
        percentage: ''
      });
    }
  }, [collectorContext, current]);

  const { name, mobile, percentage } = collector;

  const onChange = e =>
    setCollector({ ...collector, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addCollector(collector);
    setAlert('Collector Added', 'success');
    clear();
  };

  const clear = () => {
    clearCollectorCurrent();
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Add Collector
            </CardHeader>
            <CardBody>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Collector's Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Collector's Name"
                        value={name}
                        onChange={onChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="mobile">Mobile Number</Label>
                      <Input
                        type="text"
                        minLength="11"
                        maxLength="11"
                        name="mobile"
                        id="mobile"
                        value={mobile}
                        placeholder="Enter 11-digit Mobile Number"
                        onChange={onChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">Cut Percentage of the Collector</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <FormGroup>
                      <Input
                        type="number"
                        name="percentage"
                        id="percentage"
                        value={percentage}
                        onChange={onChange}
                      />{' '}
                      %
                    </FormGroup>
                  </Col>
                </Row>
                <Button outline color="primary">
                  {current ? 'Update Collector' : 'Add Collector'}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CollectorForm;
