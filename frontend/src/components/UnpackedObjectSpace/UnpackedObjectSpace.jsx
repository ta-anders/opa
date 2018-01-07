import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UnpackedObjectSpace.css';
import {renderPackingObject} from '../PlacedPackingObject/PlacedPackingObject'


class UnpackedObjectSpace extends Component {
  render() {
    const packingObjects = this.props.objects.map(
      obj => renderPackingObject(obj)
    )
    return (
      <div className="UnpackedObjectSpace">
        {packingObjects}
      </div>
    );
  }
}

UnpackedObjectSpace.propTypes = {
  objects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      packed: PropTypes.bool.isRequired
    }).isRequired
  )
};

UnpackedObjectSpace.defaultProps = {objects: []}

export default UnpackedObjectSpace
