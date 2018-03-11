import React from 'react';
import PackingObject from '../../containers/PackingObject';

const getStyles = (props) => {
  const { xCoordinate, yCoordinate } = props;
  const transform = `translate3d(${xCoordinate}px, ${yCoordinate}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
  };
};

const PlacedPackingObject = (props) => {
  const { height, width, rotated, backgroundColor, sessionId, id } = props;
  return (
    <div style={getStyles(props)}>
      <PackingObject
        height={height}
        width={width}
        packed
        rotated={rotated}
        backgroundColor={backgroundColor}
        id={id}
        sessionId={sessionId}
      />
    </div>
  );
};

export default PlacedPackingObject;
