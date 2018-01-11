import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PackingObject.css';

class PackingObject extends Component {
  render() {
    const { height, width, packed } = this.props;
    const fill = packed ? 'green': '#2b01a0';
    return (
      <div className="PackingObject"
           style={
             {width: width, height: height, backgroundColor: fill}
           }>
      </div>
    )
  }
}

PackingObject.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  packed: PropTypes.bool.isRequired
};

PackingObject.defaultProps = {
  height: 10,
  width: 10,
  packed: false
}

export default PackingObject
