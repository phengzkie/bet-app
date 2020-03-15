import React, { useContext, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import BetContext from '../../context/bet/betContext';
import CoordinatorAuthContext from '../../context/coordinatorAuth/coordinatorAuthContext';

const Reports = ({ date }) => {
  const coordinatorAuthContext = useContext(CoordinatorAuthContext);
  const betContext = useContext(BetContext);

  const {
    coordinatorTotal,
    getTotalAmountCollected,
    coordinatorPay,
    totalNet
  } = betContext;
  const { coordinator } = coordinatorAuthContext;

  useEffect(() => {
    if (coordinator !== null) {
      getTotalAmountCollected(coordinator._id, date);
    }

    // eslint-disable-next-line
  }, [date]);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <div className="text-value">
                Php {coordinatorTotal.toFixed(2)}
              </div>
              <div>Total Gross </div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-primary">
            <CardBody className="pb-0">
              <div className="text-value">Php {coordinatorPay.toFixed(2)}</div>
              <div>Pay Out</div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-warning">
            <CardBody className="pb-0">
              <div className="text-value">{totalNet.toFixed(2)}</div>
              <div>Total Net</div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white">
            <CardBody className="pb-0">
              <div className="text-value">
                Php {coordinatorTotal.toFixed(2)}
              </div>
              <div>Total Gross </div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white">
            <CardBody className="pb-0">
              <div className="text-value">Php {coordinatorPay.toFixed(2)}</div>
              <div>Pay Out</div>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white">
            <CardBody className="pb-0">
              <div className="text-value">{totalNet.toFixed(2)}</div>
              <div>Total Net</div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
