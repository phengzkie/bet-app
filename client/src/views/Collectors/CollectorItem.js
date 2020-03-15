import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CollectorContext from '../../context/collector/collectorContext';

const CollectorItem = ({ collector }) => {
  const collectorContext = useContext(CollectorContext);
  const {
    deleteCollector,

    clearCollectorCurrent
  } = collectorContext;

  const { _id, name, mobile, percentage } = collector;

  const onDelete = () => {
    deleteCollector(_id);
    clearCollectorCurrent();
  };

  return (
    <tr>
      <th>{name}</th>
      <th>{mobile}</th>
      <th className="text-center">{percentage} %</th>
      <th className="text-center">
        <span className="text-danger" onClick={onDelete}>
          <i className="icon-trash" />
        </span>
      </th>
    </tr>
  );
};

CollectorItem.propTypes = {
  collector: PropTypes.object.isRequired
};

export default CollectorItem;
