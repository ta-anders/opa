import React from 'react'
import { connect } from 'react-redux'
import { deletePackingObjects } from '../../actions'

const DeleteObjectsButton = (props) => {
  return (
    <button className="DeleteButton"
            onClick={props.deleteObjects}>
      Delete All
    </button>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteObjects: () => dispatch(deletePackingObjects()),
});


export default connect(null, mapDispatchToProps)(DeleteObjectsButton)