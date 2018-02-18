import React, { Component } from 'react';
import classNames from 'classnames';

import './index.css';

class PackingObject extends Component {
  constructor(props) {
    super(props);
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

    const style = { width, height, backgroundColor };

    const objClass = classNames({
      unpacked: !packed,
      faded: isDragging || updatingObjects.indexOf(id) !== -1,
      rotated,
    });

    return connectDragSource(
      <div
        className={objClass}
        style={style}
        onDoubleClick={this.handleDoubleClick}
      />,
    );
  }
}

export default PackingObject;
