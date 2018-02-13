import React, { Component } from 'react';
import { connect } from 'react-redux';
import callSolver from '../../actions/solves';


const SolveButton = (props) => {
    return (
        <button className="circular ui right floated icon button"
                data-tooltip="pack"
                data-variation="tiny"
                data-position="left center"
                onClick={() => props.callSolver(props.sessionId)}>
          <i className="cubes icon"></i>
        </button>
    )
};


const mapDispatchToProps = dispatch => ({
  callSolver: (sessionId, body) => dispatch(callSolver(sessionId, body)),
});


export default connect(null, mapDispatchToProps)(SolveButton)
