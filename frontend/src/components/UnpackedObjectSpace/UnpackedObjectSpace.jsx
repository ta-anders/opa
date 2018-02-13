import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { updatePackingObject } from '../../actions/packingObjects';
import ItemTypes from '../../ItemTypes';
import PackingObject from '../PackingObject/PackingObject';
import './UnpackedObjectSpace.css';

const unpackedSpaceTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();

    props.updatePackingObject(props.sessionId, {x_coordinate: null, y_coordinate: null}, item.id);
  }
}


const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}


class UnpackedObjectSpace extends Component {
  renderPackingObject(obj, sessionId) {
    return <PackingObject height={obj.height}
                          width={obj.width}
                          packed={false}
                          rotated={obj.rotated}
                          backgroundColor={obj.backgroundColor}
                          sessionId={sessionId}
                          id={obj.id}
                          key={obj.id}/>
  }

  render() {
    const packingObjects = this.props.objects.map(
      obj => this.renderPackingObject(obj, this.props.sessionId)
    )
    return this.props.connectDropTarget(
      <div className="UnpackedObjectSpace">
        {packingObjects}
      </div>
    );
  }
}


const UnpackedObjectSpaceTarget = (
  DropTarget(ItemTypes.PACKING_OBJECT, unpackedSpaceTarget, collect)(UnpackedObjectSpace)
);


const mapDispatchToProps = dispatch => ({
  updatePackingObject: (sessionId, body, id) => dispatch(updatePackingObject(sessionId, body, id)),
});


const UnpackedObjectSpaceTargetContainer = connect(null, mapDispatchToProps)(UnpackedObjectSpaceTarget);

export default UnpackedObjectSpaceTargetContainer;
