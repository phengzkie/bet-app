import React, { Fragment, useContext, useEffect } from 'react';
import CollectorContext from '../../context/collector/collectorContext';
import CollectorItem from './CollectorItem';
import {
  Spinner,
  Row,
  Table,
  Col,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';

const Collector = () => {
  const collectorContext = useContext(CollectorContext);

  const { collectors, getCollectors, loading } = collectorContext;

  useEffect(() => {
    getCollectors();

    // eslint-disable-next-line
  }, []);

  if (collectors !== null && collectors.length === 0 && !loading) {
    return <h4>Please add a Collector</h4>;
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Collector's List
            </CardHeader>
            <CardBody>
              <Fragment>
                <div className="table-responsive">
                  <Table bordered responsive size="sm" hover>
                    <thead className="thead-light">
                      <tr>
                        <th>Collector</th>
                        <th>Mobile Number</th>
                        <th className="text-center">Percentage</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collectors !== null ? (
                        collectors.map(collector => (
                          <CollectorItem
                            key={collector._id}
                            collector={collector}
                          />
                        ))
                      ) : (
                        <Spinner color="primary" />
                      )}
                    </tbody>
                  </Table>
                </div>
              </Fragment>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Collector;
