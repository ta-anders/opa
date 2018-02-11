import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";


import { fetchSessions } from '../../actions'


class SessionsList extends Component {
  componentDidMount() {
    this.props.loadSessions();
  }

  renderSession(session) {
    const {id, name, createdAt} = session;
    return (
      <li
        className="item"
        key={id}>
        <Link to={`${this.props.match.url}/${id}`}>Session {name} created at {createdAt}</Link>
      </li>
    )
  }

  render() {
    const renderedSessions = this.props.sessions.map(s => this.renderSession(s));

    return (
      <div>
        <h2>Sessions</h2>
        <ul>
          {renderedSessions}
        </ul>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    sessions: state.sessions
})


const mapDispatchToProps = dispatch => ({
  loadSessions: () => dispatch(fetchSessions()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionsList))
