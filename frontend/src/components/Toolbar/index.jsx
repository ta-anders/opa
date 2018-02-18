import React from 'react';
import ClearObjects from '../../components/Toolbar/ClearObjects';
import CreateObjects from '../../components/Toolbar/CreateObjects';
import DeleteObjects from '../../components/Toolbar/DeleteObjects';
import SolveButton from '../../components/Toolbar/SolveButton';
import Utilisation from '../../components/Toolbar/Utilisation';
import './index.css';

const Toolbar = (props) => {
  const {
    sessionId,
    clearPackedObjects,
    createObjects,
    unpackedObjects,
    deleteObjects,
    callSolver,
    packedObjects,
    totalVolume,
  } = props;

  return (
    <div className="toolbar">
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
        <Utilisation
          packedObjects={packedObjects}
          totalVolume={totalVolume}
        />
        <ClearObjects
          sessionId={sessionId}
          clearPackedObjects={clearPackedObjects}
        />
        <SolveButton
          sessionId={sessionId}
          callSolver={callSolver}
        />
      </div>
      <div className="unpacked-section">
        <div style={{ float: 'left', paddingLeft: '30%' }}>
          <CreateObjects
            sessionId={sessionId}
            createObjects={createObjects}
            unpackedObjects={unpackedObjects}
          />
        </div>
        <div style={{ float: 'right' }}>
          <DeleteObjects
            sessionId={sessionId}
            deleteObjects={deleteObjects}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
