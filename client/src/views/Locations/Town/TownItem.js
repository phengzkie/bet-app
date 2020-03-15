import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TownContext from '../../../context/town/townContext';

const TownItem = ({ town }) => {
  const townContext = useContext(TownContext);
  const { deleteTown, setTownCurrent, clearTownCurrent } = townContext;

  const { _id, name, province } = town;

  const onDelete = () => {
    deleteTown(_id);
    clearTownCurrent();
  };

  return (
    <tr>
      <th>{province}</th>
      <th>{name}</th>

      <th className="text-center">
        <span className="text-success" onClick={() => setTownCurrent(town)}>
          <i className="icon-pencil" />
        </span>{' '}
        <span className="text-danger" onClick={onDelete}>
          <i className="icon-trash" />
        </span>
      </th>
    </tr>
  );
};

TownItem.propTypes = {
  town: PropTypes.object.isRequired
};

export default TownItem;
