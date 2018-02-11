import React, { Component } from 'react';
import { DragSource } from 'react-dnd'

import ItemTypes from '../../ItemTypes'

import './PackingObject.css';
import { connect } from 'react-redux'
import { updatePackingObject } from '../../actions'


const packingObjectSource = {
	beginDrag(props) {
		return {id: props.id, width: props.width, height: props.height};
	},
}


const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class PackingObject extends Component {
  constructor(props) {
    super(props);

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick() {
    this.props.updatePackingObject(this.props.sessionId, {rotated: (!this.props.rotated)}, this.props);
  }

  render() {
    const { height, width, packed, rotated, backgroundColor, connectDragSource, isDragging } = this.props;
    let style = {width: width, height: height};
    if (!packed) {
      style.display = "inline-block";
      style.marginLeft = "20px";
    }
    style.opacity = isDragging ? 0.25 : 1;
    style.backgroundColor = backgroundColor;

    if (rotated) {
      style.border = "2.5px solid black";
    }

    return connectDragSource(
      <div style={style} onDoubleClick={this.handleDoubleClick}>
      </div>
    )
  }
}


const DraggablePackingObject = DragSource(ItemTypes.PACKING_OBJECT, packingObjectSource, collect)(PackingObject);


const mapDispatchToProps = dispatch => ({
  updatePackingObject: (sessionId, body, id) => dispatch(updatePackingObject(sessionId, body, id)),
});


export default connect(null, mapDispatchToProps)(DraggablePackingObject)
