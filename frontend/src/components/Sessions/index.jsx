import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, List } from 'semantic-ui-react';
import CreateSessionModal from './CreateSessionModal';
import DeleteSessionButton from './DeleteSessionButton';

class SessionsList extends Component {
  constructor(props) {
    super(props);
    this.onSessionStart = this.onSessionStart.bind(this);
  }

  componentDidMount() {
    this.props.loadSessions();
  }

  onSessionStart(session) {
    if (session.status === 'New') {
      this.props.updateSession(session.id, { status: 'Started' });
    }
  }

  renderSession(session) {
    const { id, name } = session;
    const createdAt = (new Date(session.createdAt)).toString();

    let text = null;
    let color = null;
    if (session.status === 'New') {
      text = 'Start';
      color = 'blue';
    }
    else {
      text = 'Resume';
      color = 'green';
    }
    return (
      <List.Item key={session.id}>
        <List.Content floated="right">
          <Link to={`${this.props.match.url}/${id}`}>
            <Button
              onClick={() => this.onSessionStart(session)}
              color={color}
            >
              {text}
            </Button>
          </Link>
          <DeleteSessionButton
            sessionId={id}
            deleteSession={this.props.deleteSession}
          />
        </List.Content>
        <List.Content>
          <List.Header>{name}</List.Header>
          <List.Description>Created on {createdAt}</List.Description>
        </List.Content>
      </List.Item>
    );
  }

  render() {
    const renderedSessions = this.props.sessions.map(s => this.renderSession(s));

    return (
      <div style={{ padding: "2.5em" }}>
        <h2 align="center">Sessions</h2>
        <CreateSessionModal addNewSession={this.props.addNewSession} />
        <List divided verticalAlign="middle" >
          {renderedSessions}
        </List>
      </div>
    );
  }
}

export default SessionsList;
