import React from 'react'
import { connect } from 'react-redux'
import { deletePackingObjects } from '../../actions'

const DeleteObjectsButton = (props) => {
  return (
    <div className="ui button" style={{fontSize: "14px"}}
         onClick={() => props.deleteObjects(props.sessionId)}>
      <i className="trash icon"></i> clear
    </div>
  )
};


const mapDispatchToProps = dispatch => ({
  deleteObjects: (sessionId) => dispatch(deletePackingObjects(sessionId)),
});


export default connect(null, mapDispatchToProps)(DeleteObjectsButton)