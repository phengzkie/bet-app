import React from 'react';
import ReactDOM from 'react-dom';
import AddCoordinator from './AddCoordinator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddCoordinator />, div);
  ReactDOM.unmountComponentAtNode(div);
});
