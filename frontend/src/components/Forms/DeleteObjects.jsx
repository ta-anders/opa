import React from 'react'
import { connect } from 'react-redux'
import { deletePackingObjects } from '../../actions'

const DeleteObjectsButton = (props) => {
  return (
    <div className="ui button" style={{fontSize: "14px"}}
         onClick={props.deleteObjects}>
      <i className="trash icon"></i> clear
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteObjects: () => dispatch(deletePackingObjects()),
});


export default connect(null, mapDispatchToProps)(DeleteObjectsButton)