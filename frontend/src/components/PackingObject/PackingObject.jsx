import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd'

import ItemTypes from '../../ItemTypes'

import './PackingObject.css';


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
  render() {
    const { height, width, packed, backgroundColor, connectDragSource, isDragging } = this.props;
    let style = {width: width, height: height};
    if (!packed) {
      style.display = "inline-block";
      style.marginLeft = "20px";
    }
    style.opacity = isDragging ? 0.25 : 1;
    console.log(backgroundColor)
    style.backgroundColor = backgroundColor;

    return connectDragSource(
      <div style={style}>
      </div>
    )
  }
}

PackingObject.propTypes = {
  id: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  packed: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};


const DraggablePackingObject = DragSource(ItemTypes.PACKING_OBJECT, packingObjectSource, collect)(PackingObject);
export default DraggablePackingObject
