import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UnpackedObjectSpace.css';
import PackingObject from '../PackingObject/PackingObject'


const numBlocksGenerated = 20

class UnpackedObjectSpace extends Component {

  renderPackingObject(i){
    const width = 10 + Math.floor(200 * Math.random());
    const height = 10 + Math.floor(50 * Math.random());

    return <PackingObject key={i}
                          height={height}
                          width={width}
                          fill={"blue"}/>
  }

  render() {
    const packingObjects = [];
    for (let i = 0; i < numBlocksGenerated; i++){
      packingObjects.push(this.renderPackingObject(i));
    }

    return (
      <div className="UnpackedObjectSpace">
        {packingObjects}
      </div>
    );
  }
}

UnpackedObjectSpace.propTypes = {}

export default UnpackedObjectSpace
