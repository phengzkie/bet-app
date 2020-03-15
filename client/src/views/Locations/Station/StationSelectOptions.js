import React, { useEffect, useContext } from 'react';
import StationContext from '../../../context/station/stationContext';

const StationSelectOptions = () => {
  const stationContext = useContext(StationContext);

  const { stations, getStations, loading } = stationContext;

  useEffect(() => {
    getStations();

    // eslint-disable-next-line
  }, []);

  return (
    !loading &&
    stations !== null &&
    stations.map(station => (
      <option key={station._id} value={`${station._id}&${station.name}`}>
        {station.name}
      </option>
    ))
  );
};

export default StationSelectOptions;
