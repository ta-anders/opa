import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UnpackedObjectSpace.css';
import PackingObject from '../PackingObject/PackingObject'


class UnpackedObjectSpace extends Component {
  renderPackingObject(obj) {
    return <PackingObject height={obj.height}
                          width={obj.width}
                          packed={false}
                          key={obj.id}/>
  }

  render() {
    const packingObjects = this.props.objects.map(
      obj => this.renderPackingObject(obj)
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
    }).isRequired
  )
};

UnpackedObjectSpace.defaultProps = {objects: []}

export default UnpackedObjectSpace
