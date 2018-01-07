import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PackingSpace.css';
import {renderPackingObject} from '../PlacedPackingObject/PlacedPackingObject'

class PackingSpace extends Component {
  render() {
    const { height, width, objects} = this.props;
    const packingObjects = this.props.objects.map(
      obj => renderPackingObject(obj)
    )
    return (
      <div className="PackingSpace" style={{width: width, height: height}}>
        {packingObjects}
      </div>
    );
  }
}

PackingSpace.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  objects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      packed: PropTypes.bool.isRequired
    }).isRequired
  )
};

PackingSpace.defaultProps = {height: 400, width: 450, objects: []}

export default PackingSpace
