import React from 'react';
import { Card, CardHeader } from 'reactstrap';
import AreaReport from './AreaReport';

const Batangas = () => {
  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <strong>Reports</strong>
        </CardHeader>
        <AreaReport />
      </Card>
    </div>
  );
};

export default Batangas;
