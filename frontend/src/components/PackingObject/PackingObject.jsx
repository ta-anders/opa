import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PackingObject.css';

class PackingObject extends Component {
  render() {
    const { height, width } = this.props;
    return (
      <div className="PackingObject" style={{width: width, height: height}}>
      </div>
    )
  }
}

PackingObject.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

PackingObject.defaultProps = {
  height: 10,
  width: 10,
}

export default PackingObject
