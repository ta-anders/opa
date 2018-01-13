import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UnpackedObjectSpace.css';
import PackingObject from '../PackingObject/PackingObject'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../../ItemTypes'
import { connect } from 'react-redux'
import { updatePackingObject } from '../../actions'


const unpackedSpaceTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();

    props.updatePackingObject({x_coordinate: null, y_coordinate: null}, item);
  }
}


const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}


class UnpackedObjectSpace extends Component {
  renderPackingObject(obj) {
    return <PackingObject height={obj.height}
                          width={obj.width}
                          packed={false}
                          id={obj.id}
                          key={obj.id}/>
  }

  render() {
    const packingObjects = this.props.objects.map(
      obj => this.renderPackingObject(obj)
    )
    return this.props.connectDropTarget(
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
  ),
  connectDropTarget: PropTypes.func.isRequired,
  updatePackingObject: PropTypes.func.isRequired
};

UnpackedObjectSpace.defaultProps = {objects: []}

const UnpackedObjectSpaceTarget = (
  DropTarget(ItemTypes.PACKING_OBJECT, unpackedSpaceTarget, collect)(UnpackedObjectSpace)
);

const mapDispatchToProps = dispatch => ({
  updatePackingObject: (body, id) => dispatch(updatePackingObject(body, id)),
});


const UnpackedObjectSpaceTargetContainer = connect(null, mapDispatchToProps)(UnpackedObjectSpaceTarget);

export default UnpackedObjectSpaceTargetContainer;
