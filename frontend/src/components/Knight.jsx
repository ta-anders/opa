import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Knight.css'
import { ItemTypes } from '../Constants';
import { DragSource } from 'react-dnd';


const knightSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Knight extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className="Knight"
           style={{
             opacity: isDragging ? 0.5 : 1,
             fontWeight: 'bold',
             cursor: 'move'
           }}>
        ♘
      </div>
    );
  }
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
