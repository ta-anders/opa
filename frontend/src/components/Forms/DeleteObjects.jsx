import React from 'react'
import { connect } from 'react-redux'
import { deletePackingObjects } from '../../actions'

const DeleteObjectsButton = (props) => {
  return (
    <div class="ui right floated button" style={{fontSize: "14px"}}
         onClick={props.deleteObjects}>
      <i class="trash icon"></i> clear all
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteObjects: () => dispatch(deletePackingObjects()),
});


export default connect(null, mapDispatchToProps)(DeleteObjectsButton)