import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';
import { Alert } from 'reactstrap';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <Alert key={alert.id} color={alert.type}>
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
