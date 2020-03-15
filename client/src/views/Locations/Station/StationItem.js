import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StationContext from '../../../context/station/stationContext';

const StationItem = ({ station }) => {
  const stationContext = useContext(StationContext);
  const {
    deleteStation,
    setStationCurrent,
    clearStationCurrent
  } = stationContext;

  const { _id, name, town, percentage } = station;

  const onDelete = () => {
    deleteStation(_id);
    clearStationCurrent();
  };

  return (
    <tr>
      <th>{town}</th>
      <th>{name}</th>
      <th className="text-center">{percentage} %</th>
      <th className="text-center">
        <span
          className="text-success"
          onClick={() => setStationCurrent(station)}
        >
          <i className="icon-pencil" />
        </span>{' '}
        <span className="text-danger" onClick={onDelete}>
          <i className="icon-trash" />
        </span>
      </th>
    </tr>
  );
};

StationItem.propTypes = {
  station: PropTypes.object.isRequired
};

export default StationItem;
