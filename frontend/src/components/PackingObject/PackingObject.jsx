import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd'

import ItemTypes from '../../ItemTypes'

import './PackingObject.css';


const packingObjectSource = {
	beginDrag(props) {
		return {id: props.id};
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
    const { height, width, packed, connectDragSource, isDragging } = this.props;
    let style = {width: width, height: height};
    if (!packed) {
      style.display = "inline-block";
      style.backgroundColor = "#2b01a0";
      style.marginLeft = "20px";
    }
    else {
      style.backgroundColor = "green";
    }
    style.opacity = isDragging ? 0.25 : 1;

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
  packed: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  updatePackingObject: PropTypes.func.isRequired
};


const DraggablePackingObject = DragSource(ItemTypes.PACKING_OBJECT, packingObjectSource, collect)(PackingObject);
export default DraggablePackingObject

