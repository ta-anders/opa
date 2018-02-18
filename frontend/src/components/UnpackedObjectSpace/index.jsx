import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PackingObject from '../../containers/PackingObject';
import ItemTypes from '../../ItemTypes';
import './index.css';

const unpackedSpaceTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();

    props.updatePackingObject(
      props.sessionId,
      { x_coordinate: null, y_coordinate: null },
      item.id,
    );
  },
};

const collect = conn => ({
  connectDropTarget: conn.dropTarget(),
});

class UnpackedObjectSpace extends Component {
  renderPackingObject(obj, sessionId) {
    return (
      <PackingObject
        height={obj.height}
        width={obj.width}
        rotated={obj.rotated}
        backgroundColor={obj.backgroundColor}
        sessionId={sessionId}
        id={obj.id}
        key={obj.id}
      />
    );
  }

  render() {
    const packingObjects = this.props.objects.map(
      obj => this.renderPackingObject(obj, this.props.sessionId),
    );
    return this.props.connectDropTarget(
      <div className="unpacked-object-space">
        {packingObjects}
      </div>,
    );
  }
}

const UnpackedObjectSpaceTarget = (
  DropTarget(
    ItemTypes.PACKING_OBJECT,
    unpackedSpaceTarget,
    collect,
  )(UnpackedObjectSpace)
);

export default UnpackedObjectSpaceTarget;
