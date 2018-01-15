import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { updatePackingObject } from '../../actions'


class ClearObjectsButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const unassignedBody = {
      x_coordinate: null,
      y_coordinate: null
    };
    const { updatePackingObject, packedObjects } = this.props;
    for (let i = 0; i < packedObjects.length; i++) {
      const obj = packedObjects[i];
      updatePackingObject(unassignedBody, obj);
    }
  }

  render () {
    return (
        <button className="circular ui left floated icon button"
                    data-tooltip="erase progress"
                    data-variation="tiny"
                    onClick={this.onClick}>
                <i class="erase icon"></i>
        </button>
    )
  }
}


ClearObjectsButton.propTypes = {
  packedObjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired
  )
}

const mapStateToProps = state => {
  return {packedObjects: state.packingObjects.filter(entity => entity.packed)}
}


const mapDispatchToProps = dispatch => ({
  updatePackingObject: (body, id) => dispatch(updatePackingObject(body, id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ClearObjectsButton)
