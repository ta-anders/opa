import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PackingSpace.css';

class PackingSpace extends Component {
  render() {
    const { height, width} = this.props;

    return (
      <div className="PackingSpace" style={{width: width, height: height}}>
      </div>
    );
  }
}

PackingSpace.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

PackingSpace.defaultProps = {height: 400, width: 450}

export default PackingSpace
