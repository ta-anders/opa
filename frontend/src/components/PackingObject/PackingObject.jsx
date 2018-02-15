import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { updatePackingObject } from '../../actions/packingObjects';

import ItemTypes from '../../ItemTypes';

import './PackingObject.css';

const packingObjectSource = {
  beginDrag(props) {
    return { id: props.id, width: props.width, height: props.height };
  },
};

const collect = (conn, monitor) => ({
  connectDragSource: conn.dragSource(),
  isDragging: monitor.isDragging(),
});

class PackingObject extends Component {
  constructor(props) {
    super(...props);

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick() {
    this.props.updatePackingObject(
      this.props.sessionId,
      { rotated: (!this.props.rotated) },
      this.props.id,
    );
  }

  render() {
    const {
      id,
      height,
      width,
      packed,
      rotated,
      backgroundColor,
      connectDragSource,
      isDragging,
      updatingObjects,
    } = this.props;

    const style = { width, height };
    if (!packed) {
      style.display = 'inline-block';
      style.marginLeft = '20px';
    }
    const fadeOut = isDragging || updatingObjects.indexOf(id) !== -1;
    style.opacity = fadeOut ? 0.25 : 1;
    style.backgroundColor = backgroundColor;

    if (rotated) {
      style.border = '2.5px solid black';
    }

    const ele = (
      <div style={style} onDoubleClick={this.handleDoubleClick} />
    );

    return connectDragSource(ele);
  }
}

const DraggablePackingObject = DragSource(
  ItemTypes.PACKING_OBJECT,
  packingObjectSource,
  collect,
)(PackingObject);

const mapStateToProps = state => ({
  updatingObjects: state.ui.updatingObjects,
});

const mapDispatchToProps = dispatch => ({
  updatePackingObject: (sessionId, body, id) => dispatch(
    updatePackingObject(sessionId, body, id),
  ),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(DraggablePackingObject);
