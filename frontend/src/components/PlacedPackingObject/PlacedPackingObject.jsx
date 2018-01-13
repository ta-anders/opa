import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PackingObject from '../PackingObject/PackingObject';

const getStyles = (props) => {
	const { xCoordinate, yCoordinate } = props
	const transform = `translate3d(${xCoordinate}px, ${yCoordinate}px, 0)`

	return {
		position: 'absolute',
		transform,
		WebkitTransform: transform
	}
}



class PlacedPackingObject extends Component {
  render() {
    const { height, width, id } = this.props;
    console.log(getStyles(this.props));
    return (
      <div style={getStyles(this.props)}>
        <PackingObject height={height}
                       width={width}
                       packed={true}
                       id={id}>
        </PackingObject>
    </div>
    );
  }
}

PlacedPackingObject.propTypes = {
  id: PropTypes.number.isRequired,
  xCoordinate: PropTypes.number.isRequired,
  yCoordinate: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default PlacedPackingObject
