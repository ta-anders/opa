import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'


class Utilisation extends Component {
  render () {
    const vols = this.props.packedObjects.map(obj => obj.width * obj.height);

    let tot = 0;
    for (let i = 0; i < vols.length; i++) {
      tot += vols[i];
    }

    let utilisation = 100 * (tot / this.props.totalVolume);

    utilisation = Math.round(utilisation * 100) / 100;

    return (
      <h2 align="center">Utilisation: {utilisation}%</h2>
    );
  }
}

Utilisation.propTypes = {
  packedObjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  ),
  totalVolume: PropTypes.number.isRequired
}


const mapStateToProps = state => {
  return {
    packedObjects: state.packingObjects.filter(entity => entity.packed),
    totalVolume: state.packingSpace.width * state.packingSpace.height
  }
}


export default connect(mapStateToProps, null)(Utilisation)
