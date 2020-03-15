import React, { Fragment, useContext, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import Moment from 'react-moment';
import { MDBDataTable } from 'mdbreact';

import BetContext from '../../context/bet/betContext';
import CoordinatorAuthContext from '../../context/coordinatorAuth/coordinatorAuthContext';

const Bets = () => {
  const betContext = useContext(BetContext);
  const coordinatorAuthContext = useContext(CoordinatorAuthContext);

  const { bets, getBetsToday } = betContext;
  const { coordinator } = coordinatorAuthContext;

  useEffect(() => {
    getBetsToday(coordinator._id);

    // eslint-disable-next-line
  }, []);

  const data = {
    columns: [
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 50
      },
      {
        label: 'Time',
        field: 'time',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Mobile',
        field: 'mobile',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Bet',
        field: 'bet',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Amount',
        field: 'amount',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Type',
        field: 'type',
        sort: 'asc',
        width: 150
      }
    ],
    rows: bets.map(bet => {
      return {
        date: <Moment format="MMMM D, YYYY">{bet.date}</Moment>,
        time: <Moment format="h:mm:ss A">{bet.date}</Moment>,
        mobile: bet.sender,
        name: bet.collector.name,
        bet: bet.bet,
        amount: bet.amount,
        type: bet.type
      };
    })
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Bet Lists
            </CardHeader>
            <CardBody>
              <Fragment>
                <MDBDataTable responsive striped hover small data={data} />
              </Fragment>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Bets;
