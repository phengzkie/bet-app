import React from 'react';
import ReactDOM from 'react-dom';
import Coordinators from './Coordinators';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Coordinators />, div);
  ReactDOM.unmountComponentAtNode(div);
});
