import React, { Fragment, useContext, useEffect } from 'react';
import TownContext from '../../../context/town/townContext';
import TownItem from './TownItem';
import { Spinner, Table } from 'reactstrap';

const Town = () => {
  const townContext = useContext(TownContext);

  const { towns, getTowns, loading } = townContext;

  useEffect(() => {
    getTowns();

    // eslint-disable-next-line
  }, []);

  if (towns !== null && towns.length === 0 && !loading) {
    return <h4>Please add a Town</h4>;
  }

  return (
    <Fragment>
      <Table hover responsive size="sm">
        <thead className="thead-light">
          <tr>
            <th>Province</th>
            <th>Town Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {towns !== null ? (
            towns.map(town => <TownItem key={town._id} town={town} />)
          ) : (
            <Spinner color="primary" />
          )}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Town;
