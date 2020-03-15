import React, { Fragment, useContext, useEffect } from 'react';
import StationContext from '../../../context/station/stationContext';
import StationItem from './StationItem';
import { Spinner, Table } from 'reactstrap';

const Station = () => {
  const stationContext = useContext(StationContext);

  const { stations, getStations, loading } = stationContext;

  useEffect(() => {
    getStations();

    // eslint-disable-next-line
  }, []);

  if (stations !== null && stations.length === 0 && !loading) {
    return <h4>Please add a Station</h4>;
  }

  return (
    <Fragment>
      <Table hover responsive size="sm">
        <thead className="thead-light">
          <tr>
            <th>Town</th>
            <th>Station Name</th>
            <th className="text-center">Percentage</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stations !== null ? (
            stations.map(station => (
              <StationItem key={station._id} station={station} />
            ))
          ) : (
            <Spinner color="primary" />
          )}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Station;
