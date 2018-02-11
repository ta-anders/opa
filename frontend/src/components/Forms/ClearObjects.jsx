import React, { Component } from 'react'
import { connect } from 'react-redux'

import { clearPackedObjects } from '../../actions'


const ClearObjectsButton = (props) => {
  return (
      <button className="circular ui left floated icon button"
                  data-tooltip="erase progress"
                  data-variation="tiny"
                  data-position="right center"
                  onClick={() => props.clearPackedObjects(props.sessionId)}>
              <i className="erase icon"></i>
      </button>
  )
}


const mapDispatchToProps = dispatch => ({
  clearPackedObjects: (sessionId) => dispatch(clearPackedObjects(sessionId)),
});


export default connect(null, mapDispatchToProps)(ClearObjectsButton)
