import React from 'react';
import ReactDOM from 'react-dom';
import Locations from './Locations';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Locations />, div);
  ReactDOM.unmountComponentAtNode(div);
});
