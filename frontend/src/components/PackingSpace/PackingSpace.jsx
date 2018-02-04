import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Resizable from 're-resizable';

import PlacedPackingObject from '../PlacedPackingObject/PlacedPackingObject';
import ItemTypes from '../../ItemTypes';


import './PackingSpace.css';
import { connect } from 'react-redux';
import { updatePackingObject, updatePackingSpace } from '../../actions';


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
                                rotated={obj.rotated}
                                backgroundColor={obj.backgroundColor}
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
      <div className="PackingSpace">
        <Resizable size={{width: width, height: height}}
                   onResizeStop={(e, direction, ref, d) => {
                      this.props.updatePackingSpace({
                        width: d.width + width,
                        height: d.height + height,
                      });
                  }}>
            {packingObjects}
        </Resizable>
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
      backgroundColor: PropTypes.string.isRequired,
      rotated: PropTypes.bool.isRequired
    }).isRequired
  ),
  connectDropTarget: PropTypes.func.isRequired,
  updatePackingObject: PropTypes.func.isRequired,
  updatePackingSpace: PropTypes.func.isRequired
};


const PackingSpaceTarget = DropTarget(ItemTypes.PACKING_OBJECT, packingSpaceTarget, collect)(PackingSpace);


const mapStateToProps = state => {
  return state.packingSpace;
}


const mapDispatchToProps = dispatch => ({
  updatePackingObject: (body, id) => dispatch(updatePackingObject(body, id)),
  updatePackingSpace: (body) => dispatch(updatePackingSpace(body))
});


const PackingSpaceTargetContainer = connect(mapStateToProps, mapDispatchToProps)(PackingSpaceTarget);

export default PackingSpaceTargetContainer;
