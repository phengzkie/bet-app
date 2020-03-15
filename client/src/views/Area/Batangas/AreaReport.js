import React, { useContext, useEffect } from 'react';
import { Card, CardBody, Col, Row, CardTitle, CardText } from 'reactstrap';

import BetContext from '../../../context/bet/betContext';

const AreaReport = province => {
  const betContext = useContext(BetContext);

  const { getProvinceTotal, provinceTotal } = betContext;

  const { name } = province;

  useEffect(() => {
    getProvinceTotal(name);

    console.log(province);
    // eslint-disable-next-line
  }, [name]);

  return (
    <CardBody>
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card body outline color="secondary">
            <CardTitle>Php {provinceTotal}</CardTitle>
            <CardText>Batangas Daily Income</CardText>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card body outline color="secondary">
            <CardTitle>Less Cabo</CardTitle>
            <CardText>Batangas Less Cabo</CardText>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card body outline color="secondary">
            <CardTitle>Less Local</CardTitle>
            <CardText>Batangas Less Local</CardText>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card body outline color="secondary">
            <CardTitle>Win Hit</CardTitle>
            <CardText>Batangas Win Hit</CardText>
          </Card>
        </Col>
      </Row>
      <br />
    </CardBody>
  );
};

export default AreaReport;
