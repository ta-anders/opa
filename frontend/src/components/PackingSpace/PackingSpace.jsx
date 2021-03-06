import Resizable from 're-resizable';
import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { updatePackingObject } from '../../actions/packingObjects';
import { updatePackingSpace, } from '../../actions/packingSpace';
import ItemTypes from '../../ItemTypes';

import PlacedPackingObject from '../PlacedPackingObject/PlacedPackingObject';

import './PackingSpace.css';

const packingSpaceTarget = {
  drop(props, monitor) {
    const offset = monitor.getSourceClientOffset();
    const packingSpace = document.getElementsByClassName('PackingSpace')[0];
    const packingSpaceOffset = packingSpace.getBoundingClientRect();
    const item = monitor.getItem();

    const maxWidth = packingSpaceOffset.width - item.width;
    const maxHeight = packingSpaceOffset.height - item.height;

    const x = offset.x - packingSpaceOffset.left;
    const y = offset.y - packingSpaceOffset.top;


    const newPos = {
      x_coordinate: Math.min(Math.max(x, 0), maxWidth),
      y_coordinate: Math.min(Math.max(y, 0), maxHeight),
    };

    props.updatePackingObject(props.sessionId, newPos, item.id);
  },
};


const collectFunc = c => ({
  connectDropTarget: c.dropTarget(),
});

class PackingSpace extends Component {
  constructor(props) {
    super(...props);

    this.state = { height: props.height, width: props.width };
  }

  renderPlacedPackingObject(obj, sessionId) {
    return (
      <PlacedPackingObject
        xCoordinate={obj.xCoordinate}
        yCoordinate={obj.yCoordinate}
        height={obj.height}
        width={obj.width}
        rotated={obj.rotated}
        backgroundColor={obj.backgroundColor}
        sessionId={sessionId}
        key={obj.id}
        id={obj.id}
      />
    );
  }

  render() {
    const { objects, connectDropTarget, sessionId } = this.props;

    const packingObjects = objects.map(
      obj => this.renderPlacedPackingObject(obj, sessionId),
    );

    const { width, height } = this.state;
    return connectDropTarget(
      <div className="PackingSpace">
        <Resizable
          size={{ height, width }}
          onResizeStop={(e, direction, ref, d) => {
            this.props.updatePackingSpace(this.props.sessionId, {
              width: d.width + width,
              height: d.height + height,
            });
            this.setState({
              height: d.height + this.state.height,
              width: d.width + this.state.width,
            });
          }}
        >
          {packingObjects}
        </Resizable>
      </div>,
    );
  }
}


const PackingSpaceTarget = DropTarget(
  ItemTypes.PACKING_OBJECT,
  packingSpaceTarget,
  collectFunc,
)(PackingSpace);


const mapStateToProps = state => ({
  ...state.packingSpace,
});


const mapDispatchToProps = dispatch => ({
  updatePackingObject: (sessionId, body, id) => dispatch(updatePackingObject(sessionId, body, id)),
  updatePackingSpace: (sessionId, body) => dispatch(updatePackingSpace(sessionId, body)),
});


const PackingSpaceTargetContainer = connect(
  mapStateToProps, mapDispatchToProps,
)(PackingSpaceTarget);

export default PackingSpaceTargetContainer;
