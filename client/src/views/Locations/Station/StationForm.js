import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import StationContext from '../../../context/station/stationContext';
import TownSelectOptions from '../Town/TownSelectOptions';

const StationForm = () => {
  const stationContext = useContext(StationContext);

  const {
    addStation,
    current,
    clearStationCurrent,
    updateStation
  } = stationContext;

  const [station, setStation] = useState({
    name: '',
    percentage: '',
    town: ''
  });

  useEffect(() => {
    if (current !== null) {
      setStation(current);
    } else {
      setStation({
        name: '',
        percentage: '',
        town: ''
      });
    }
  }, [stationContext, current]);

  const { name, percentage, town } = station;

  const onChange = e =>
    setStation({ ...station, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null && name !== '') {
      let stationForDB = {
        name,
        percentage,
        townId: town.split('&')[0],
        town: town.split('&')[1]
      };
      addStation(stationForDB);
    } else {
      updateStation(station);
    }

    clear();
  };

  const clear = () => {
    clearStationCurrent();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleSelect">Select The Town of the Station</Label>
            <Input type="select" name="town" value={town} onChange={onChange}>
              <option value="" disabled>
                Select Town
              </option>
              <TownSelectOptions />
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="name">Name of Station</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">
              Percentage of the Station Mayor / Brgy. Captain
            </Label>
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
        {current ? 'Update Station' : 'Add Station'}
      </Button>
      {'  '}
      {current && (
        <Button outline color="secondary" onClick={clear}>
          Clear
        </Button>
      )}
    </Form>
  );
};

export default StationForm;
