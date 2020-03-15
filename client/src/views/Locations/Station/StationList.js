import React, { useEffect, useContext } from 'react';
import StationContext from '../../../context/station/stationContext';

const StationList = town => {
  const stationContext = useContext(StationContext);

  const { stationsOfTown, getStationsOfTown, loading } = stationContext;

  useEffect(() => {
    if (town.town !== '') {
      getStationsOfTown(town.town);
    }

    // eslint-disable-next-line
  }, [town.town]);

  return (
    !loading &&
    stationsOfTown !== null &&
    stationsOfTown.map(station => (
      <option key={station._id} value={`${station._id}&${station.name}`}>
        {station.name}
      </option>
    ))
  );
};

export default StationList;
