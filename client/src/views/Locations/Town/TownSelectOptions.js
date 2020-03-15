import React, { useEffect, useContext } from 'react';
import TownContext from '../../../context/town/townContext';

const TownSelectOptions = () => {
  const townContext = useContext(TownContext);

  const { towns, getTowns, loading } = townContext;

  useEffect(() => {
    getTowns();

    // eslint-disable-next-line
  }, []);

  return (
    !loading &&
    towns !== null &&
    towns.map(town => (
      <option key={town._id} value={`${town._id}&${town.name}`}>
        {town.name}
      </option>
    ))
  );
};

export default TownSelectOptions;
