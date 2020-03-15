import React, { Fragment, useContext, useEffect } from 'react';
import ProvinceContext from '../../../context/province/provinceContext';
import ProvinceItem from './ProvinceItem';
import { Spinner } from 'reactstrap';

const Province = () => {
  const provinceContext = useContext(ProvinceContext);

  const { provinces, getProvinces, loading } = provinceContext;

  useEffect(() => {
    getProvinces();

    // eslint-disable-next-line
  }, []);

  if (provinces !== null && provinces.length === 0 && !loading) {
    return <h4>Please add a province</h4>;
  }

  return (
    <Fragment>
      {provinces !== null && !loading ? (
        provinces.map(province => (
          <ProvinceItem key={province._id} province={province} />
        ))
      ) : (
        <Spinner color="primary" />
      )}
    </Fragment>
  );
};

export default Province;
