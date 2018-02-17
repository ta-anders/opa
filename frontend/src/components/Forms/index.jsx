import React from 'react';
import { connect } from 'react-redux';
import ClearObjectsButton from './ClearObjects';
import CreateObjectsFormContainer from './CreateObjects';
import DeleteObjectsButtonContainer from './DeleteObjects';
import './index.css';
import SolveButton from './SolveButton';
import Utilisation from './Utilisation';

const FormBar = (props) => {
  const { sessionId } = props;

  return (
    <div className="FormBar">
      <div
        style={
          {
            width: props.width,
            height: '100%',
            float: 'left',
            textAlign: 'center',
          }
        }
      >
        <Utilisation />
        <ClearObjectsButton sessionId={sessionId} />
        <SolveButton sessionId={sessionId} />
      </div>
      <div className="UnpackedForms">
        <div style={{ float: 'left', paddingLeft: '30%' }}>
          <CreateObjectsFormContainer sessionId={sessionId} />
        </div>
        <div style={{ float: 'right' }}>
          <DeleteObjectsButtonContainer sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => state.packingSpace;

export default connect(mapStateToProps, null)(FormBar);
