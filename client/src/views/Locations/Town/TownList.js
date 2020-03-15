import React, { useEffect, useContext } from 'react';
import TownContext from '../../../context/town/townContext';

const TownList = province => {
  const townContext = useContext(TownContext);

  const { townsOfProvince, getTownOfProvince, loading } = townContext;

  useEffect(() => {
    if (province.province !== '' && !loading) {
      getTownOfProvince(province.province);
    }

    // eslint-disable-next-line
  }, [province.province]);

  return (
    !loading &&
    townsOfProvince !== null &&
    townsOfProvince.map(town => (
      <option key={town._id} value={`${town._id}&${town.name}`}>
        {town.name}
      </option>
    ))
  );
};

export default TownList;
