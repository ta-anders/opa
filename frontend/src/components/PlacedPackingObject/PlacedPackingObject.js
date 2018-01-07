import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PackingObject from '../PackingObject/PackingObject';


export function renderPackingObject(obj){
    return <PlacedPackingObject key={obj.id}
                                height={obj.height}
                                width={obj.width}
                                xCoordinate={obj.xCoordinate}
                                yCoordinate={obj.yCoordinate}/>
  }


class PlacedPackingObject extends Component {
  packed() {
    return (
      this.props.xCoordinate !== null &&
      this.props.yCoordinate !== null
    );
  }

  render() {
    const { height, width } = this.props;
    const packed = this.packed();
    return (
      <PackingObject height={height} width={width} packed={packed}>
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