import React, { Component } from 'react';
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

    props.updatePackingObject(props.sessionId, newPos, item);
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
                      this.props.updatePackingSpace(this.props.sessionId, {
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


const PackingSpaceTarget = DropTarget(ItemTypes.PACKING_OBJECT, packingSpaceTarget, collect)(PackingSpace);


const mapStateToProps = state => {
  return {
    ...state.packingSpace
  }
}


const mapDispatchToProps = dispatch => ({
  updatePackingObject: (sessionId, body, id) => dispatch(updatePackingObject(sessionId, body, id)),
  updatePackingSpace: (sessionId, body) => dispatch(updatePackingSpace(sessionId, body))
});


const PackingSpaceTargetContainer = connect(mapStateToProps, mapDispatchToProps)(PackingSpaceTarget);

export default PackingSpaceTargetContainer;
