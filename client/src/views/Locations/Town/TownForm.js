import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import TownContext from '../../../context/town/townContext';
import ProvinceSelectOptions from '../Province/ProvinceSelectOptions';

const TownForm = () => {
  const townContext = useContext(TownContext);

  const { addTown, current, clearTownCurrent, updateTown } = townContext;

  const [town, setTown] = useState({
    name: '',
    percentage: '',
    province: ''
  });

  useEffect(() => {
    if (current !== null) {
      setTown(current);
    } else {
      setTown({
        name: '',
        percentage: '',
        province: ''
      });
    }
  }, [townContext, current]);

  const { name, percentage, province } = town;

  const onChange = e => setTown({ ...town, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null && name !== '') {
      let townForDB = {
        name,
        percentage,
        provinceId: splitProvince(province)[0],
        province: splitProvince(province)[1]
      };

      addTown(townForDB);
    } else {
      updateTown(town);
    }

    clear();
  };

  const clear = () => {
    clearTownCurrent();
  };

  const splitProvince = province => {
    let splittedProvince = province.split('&');

    //console.log('splittedProvince', splittedProvince);
    return splittedProvince;
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleSelect">Select The Province of the Town</Label>
            <Input
              type="select"
              name="province"
              value={province}
              onChange={onChange}
            >
              <option value="" disabled>
                Select Province
              </option>
              <ProvinceSelectOptions />
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="name">Name of Town</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <Button outline color="primary">
        {current ? 'Update Town' : 'Add Town'}
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

export default TownForm;
