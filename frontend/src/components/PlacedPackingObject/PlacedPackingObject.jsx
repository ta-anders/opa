import React, { Component } from 'react';
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
    const { height, width, rotated, backgroundColor, id } = this.props;
    return (
      <div style={getStyles(this.props)}>
        <PackingObject height={height}
                       width={width}
                       packed={true}
                       rotated={rotated}
                       backgroundColor={backgroundColor}
                       id={id}>
        </PackingObject>
    </div>
    );
  }
}


export default PlacedPackingObject
