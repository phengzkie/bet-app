import React from 'react';
import ReactDOM from 'react-dom';
import Batangas from './Batangas';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Batangas />, div);
  ReactDOM.unmountComponentAtNode(div);
});
