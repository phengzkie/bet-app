import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Spinner,
  Table
} from 'reactstrap';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import CollectorContext from '../../context/collector/collectorContext';

import Reports from './Reports';

const Dashboard = () => {
  const collectorContext = useContext(CollectorContext);

  const { getCollectors, data, getCollectorsData } = collectorContext;

  const [date, setDate] = useState({
    startDate: new Date(),
    dateSelect: new Date()
  });

  const { startDate, dateSelect } = date;

  const onChange = date => {
    setDate({ startDate: date, dateSelect: date });
  };

  useEffect(() => {
    getCollectors();

    if (dateSelect !== '') {
      getCollectorsData(convertDate(dateSelect));
    }

    // eslint-disable-next-line
  }, [dateSelect]);

  const convertDate = date => {
    var today = date;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var convertedDate = new Date(today);

    return convertedDate.toISOString();
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card>
            <CardHeader>
              Select Date:{'  '}
              <DatePicker
                selected={startDate}
                onChange={onChange}
                maxDate={new Date()}
                placeholderText="Click to select a date"
                dateFormat="MMMM d, yyyy"
              />
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Reports date={convertDate(dateSelect)} />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <strong>Collector's Report</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Table bordered responsive size="sm" hover>
                  <thead className="thead-light">
                    <tr>
                      <th>Collector</th>
                      <th>Gross</th>
                      <th>Pay Out</th>
                      <th>Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data !== null ? (
                      data.map(collector => (
                        <tr key={collector.name}>
                          <td>{collector.name}</td>
                          <td>{collector.gross.toFixed(2)}</td>
                          <td>{collector.pay.toFixed(2)}</td>
                          <td>{collector.net.toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <Spinner color="primary" />
                    )}
                  </tbody>
                </Table>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
