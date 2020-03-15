import React, { useEffect, useContext } from 'react';
import ProvinceContext from '../../../context/province/provinceContext';

const ProvinceSelectOptions = () => {
  const provinceContext = useContext(ProvinceContext);

  const { provinces, getProvinces, loading } = provinceContext;

  useEffect(() => {
    getProvinces();

    // eslint-disable-next-line
  }, []);

  return (
    !loading &&
    provinces !== null &&
    provinces.map(province => (
      <option key={province._id} value={`${province._id}&${province.name}`}>
        {province.name}
      </option>
    ))
  );
};

export default ProvinceSelectOptions;
