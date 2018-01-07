import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PackingObject from '../PackingObject/PackingObject';


class PlacedPackingObject extends Component {
  render() {
    const { height, width } = this.props;
    return (
      <PackingObject height={height} width={width} packed={true}>
      </PackingObject>
    );
  }
}

PlacedPackingObject.propTypes = {
  xCoordinate: PropTypes.number.isRequired,
  yCoordinate: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default PlacedPackingObject
