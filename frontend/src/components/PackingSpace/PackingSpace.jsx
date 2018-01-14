import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd'

import PlacedPackingObject from '../PlacedPackingObject/PlacedPackingObject'
import ItemTypes from '../../ItemTypes'


import './PackingSpace.css';
import { connect } from 'react-redux'
import { updatePackingObject } from '../../actions'


function snapToGrid(x, y) {
	const snappedX = Math.round(x / 32) * 32
	const snappedY = Math.round(y / 32) * 32

	return [snappedX, snappedY]
}


const packingSpaceTarget = {
  drop(props, monitor, component) {
    const offset = monitor.getSourceClientOffset();
    const packingSpace = document.getElementsByClassName("PackingSpace")[0];
    const packingSpaceOffset = packingSpace.getBoundingClientRect();
    const item = monitor.getItem();

    const maxWidth = packingSpaceOffset.width - item.width;
    const maxHeight = packingSpaceOffset.height - item.height;

    let x = offset.x - packingSpaceOffset.left;
    let y = offset.y - packingSpaceOffset.top;

    [x, y] = snapToGrid(x, y);

    const newPos = {
      x_coordinate: Math.min(Math.max(x, 0), maxWidth),
      y_coordinate: Math.min(Math.max(y, 0), maxHeight)
    }

    props.updatePackingObject(newPos, item);
  }
}


const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}


class PackingSpace extends Component {
  renderPlacedPackingObject(obj) {
    return <PlacedPackingObject xCoordinate={obj.xCoordinate}
                                yCoordinate={obj.yCoordinate}
                                height={obj.height}
                                width={obj.width}
                                key={obj.id}
                                id={obj.id}
    />
  }

  render() {
    const { height, width, objects, connectDropTarget} = this.props;
    const packingObjects = objects.map(
      obj => this.renderPlacedPackingObject(obj)
    )
    return connectDropTarget(
      <div className="PackingSpace" style={{width: width, height: height}}>
        {packingObjects}
      </div>
    );
  }
}

PackingSpace.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  objects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      xCoordinate: PropTypes.number.isRequired,
      yCoordinate: PropTypes.number.isRequired,
    }).isRequired
  ),
  connectDropTarget: PropTypes.func.isRequired,
  updatePackingObject: PropTypes.func.isRequired
};

PackingSpace.defaultProps = {height: 400, width: 450, objects: []}

const PackingSpaceTarget = DropTarget(ItemTypes.PACKING_OBJECT, packingSpaceTarget, collect)(PackingSpace);


const mapDispatchToProps = dispatch => ({
  updatePackingObject: (body, id) => dispatch(updatePackingObject(body, id)),
});


const PackingSpaceTargetContainer = connect(null, mapDispatchToProps)(PackingSpaceTarget);

export default PackingSpaceTargetContainer;
