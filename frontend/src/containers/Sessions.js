import { connect } from 'react-redux';
import {
  createSession, deleteSession,
  getSessions, updateSession,
} from '../actions/sessions';

import SessionsList from '../components/Sessions';

const mapStateToProps = state => ({
  sessions: state.sessions,
});

const mapDispatchToProps = dispatch => ({
  loadSessions: () => dispatch(getSessions()),
  addNewSession: body => dispatch(createSession(body)),
  deleteSession: sessionId => dispatch(deleteSession(sessionId)),
  updateSession: (sessionId, body) => dispatch(updateSession(sessionId, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionsList);
