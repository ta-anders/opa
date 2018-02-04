import React, { Component } from 'react'
import PropTypes from 'prop-types';

import FormBar from '../Forms/index'
import PackingSpace from '../PackingSpace/PackingSpace';
import UnpackedObjectSpace from '../UnpackedObjectSpace/UnpackedObjectSpace'

import './OpaApp.css'


class OpaApp extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const {packedObjects, unpackedObjects} = this.props;

    return (
      <div className="OuterWrapper">
        <div className="OpaApp">
          <FormBar/>
          <PackingSpace objects={packedObjects}/>
          <UnpackedObjectSpace objects={unpackedObjects}/>
        </div>
      </div>
    )
  }
}

OpaApp.propTypes = {
  packedObjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      xCoordinate: PropTypes.number.isRequired,
      yCoordinate: PropTypes.number.isRequired,
    }).isRequired
  ),
  unpackedObjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired
  ),
  loadData: PropTypes.func.isRequired
};


export default OpaApp