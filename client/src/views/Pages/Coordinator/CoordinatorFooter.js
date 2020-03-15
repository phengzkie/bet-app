import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CoordinatorFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <strong>Bolahan</strong> &copy; 2019.
        </span>
        <span className="ml-auto">
          Powered by <em>Sambayanang Pilipino</em>
        </span>
      </React.Fragment>
    );
  }
}

CoordinatorFooter.propTypes = propTypes;
CoordinatorFooter.defaultProps = defaultProps;

export default CoordinatorFooter;
