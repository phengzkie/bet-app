import React, { useContext, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import AuthContext from '../../../context/auth/authContext';
import BetContext from '../../../context/bet/betContext';

const Coordinator = props => {
  const authContext = useContext(AuthContext);
  const betContext = useContext(BetContext);

  const { coordinators } = authContext;
  const {
    coordinatorTotal,
    getTotalAmountCollected,
    coordinatorPay,
    totalNet
  } = betContext;

  const coordinator = coordinators.find(
    coordinator => coordinator._id === props.match.params.id
  );

  const coordinatorDetails = coordinator
    ? Object.entries(coordinator)
    : [
        [
          'id',
          <span>
            <i className="text-muted icon-ban"></i> Not found
          </span>
        ]
      ];

  useEffect(() => {
    getTotalAmountCollected(props.match.params.id);

    console.log(props.match.params.id);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <strong>
                <i className="icon-info pr-1"></i>Coordinator :{' '}
                {coordinatorDetails[2][1]}
              </strong>
            </CardHeader>
            <CardBody>
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
                        <div className="text-value">
                          Php {coordinatorPay.toFixed(2)}
                        </div>
                        <div>Pay for Cabo</div>
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
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Coordinator;
