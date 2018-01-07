import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './App.css'
import PackingSpace from './components/PackingSpace/PackingSpace';
import UnpackedObjectSpace from './components/UnpackedObjectSpace/UnpackedObjectSpace'
import { fetchPackingObjects } from './actions'


class App extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const {packedObjects, unpackedObjects} = this.props;

    return (
      <div className="App">
        <PackingSpace objects={packedObjects}/>
        <UnpackedObjectSpace objects={unpackedObjects}/>
      </div>
    )
  }
}

App.propTypes = {
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


const mapStateToProps = state => {
  return {
    packedObjects: state.packingObjects.packedObjects,
    unpackedObjects: state.packingObjects.unpackedObjects
  }
}

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(fetchPackingObjects()),
});


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer