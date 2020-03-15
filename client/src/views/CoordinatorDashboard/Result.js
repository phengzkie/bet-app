import React, { useContext, useEffect } from 'react';
import { Card, CardBody, Col, Row, CardHeader, Table } from 'reactstrap';
import BetContext from '../../context/bet/betContext';
import CoordinatorAuthContext from '../../context/coordinatorAuth/coordinatorAuthContext';
import Moment from 'react-moment';

const Result = () => {
  const coordinatorAuthContext = useContext(CoordinatorAuthContext);
  const betContext = useContext(BetContext);

  const { result, getResult } = betContext;
  const { coordinator } = coordinatorAuthContext;

  useEffect(() => {
    if (coordinator !== null) {
      getResult(coordinator._id);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Result/s
            </CardHeader>
            <CardBody>
              <Table bordered responsive size="sm" hover>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Collector</th>
                    <th scope="col">Bet</th>
                    <th scope="col">Game</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Pay Out</th>
                  </tr>
                </thead>

                {result !== null
                  ? result.map(res => (
                      <tbody>
                        <tr key={res._id}>
                          <td>
                            <div>
                              <Moment format="MMMM Do YYYY">{res.date}</Moment>
                            </div>
                            <div className="small text-muted">
                              <Moment format="h:mm:ss A">{res.date}</Moment>
                            </div>
                          </td>
                          <td>{res.collector.name}</td>
                          <td>{res.bet}</td>
                          <td>{res.game}</td>
                          <td>{res.amount}</td>
                          <td>{res.winning}</td>
                        </tr>
                      </tbody>
                    ))
                  : null}
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Result;
