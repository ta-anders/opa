import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PackingSpace.css';
import PlacedPackingObject from '../PlacedPackingObject/PlacedPackingObject'

class PackingSpace extends Component {
  renderPlacedPackingObject(obj) {
    return <PlacedPackingObject xCoordinate={obj.xCoordinate}
                                yCoordinate={obj.yCoordinate}
                                height={obj.height}
                                width={obj.width}
                                key={obj.id}/>
  }

  render() {
    const { height, width, objects} = this.props;
    const packingObjects = objects.map(
      obj => this.renderPlacedPackingObject(obj)
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
      xCoordinate: PropTypes.number.isRequired,
      yCoordinate: PropTypes.number.isRequired,
    }).isRequired
  )
};

PackingSpace.defaultProps = {height: 400, width: 450, objects: []}

export default PackingSpace
