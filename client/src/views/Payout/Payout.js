import React, { useContext, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Table
} from 'reactstrap';

import Moment from 'react-moment';

import BetContext from '../../context/bet/betContext';
import AlertContext from '../../context/alert/alertContext';

const Payout = () => {
  const betContext = useContext(BetContext);
  const alertContext = useContext(AlertContext);

  const { getPayout, payout, payOutPaid } = betContext;
  const { setAlert } = alertContext;

  const onDelete = id => {
    payOutPaid(id);
    setAlert('Payout Successfully Paid', 'success');
  };

  useEffect(() => {
    getPayout();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>Payout</h1>
            </CardHeader>

            {payout !== null ? (
              <CardBody>
                <Table responsive hover size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Collector</th>
                      <th scope="col">Coordinator</th>
                      <th scope="col">Bet</th>
                      <th scope="col">Game</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Location</th>
                      <th scope="col">Winning</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payout.map(pay => (
                      <tr key={pay._id}>
                        <td>
                          <div>
                            <Moment format="MMMM Do YYYY">{pay.date}</Moment>
                          </div>
                          <div className="small text-muted">
                            <Moment format="h:mm:ss A">{pay.date}</Moment>
                          </div>
                        </td>
                        <td>{pay.collector.name}</td>
                        <td>{pay.coordinator.name}</td>
                        <td>{pay.bet}</td>
                        <td>{pay.game}</td>
                        <td>{pay.amount}</td>
                        <td>
                          {pay.location.station.name}, {pay.location.town.name}
                        </td>
                        <td>{pay.winning}</td>
                        <td>
                          <Button
                            color="success"
                            onClick={() => onDelete(pay._id)}
                          >
                            Paid
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            ) : (
              <CardBody>No Pending Payout</CardBody>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payout;
