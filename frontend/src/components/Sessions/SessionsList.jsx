import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import { Button, Form, Icon, Modal, Message, List } from 'semantic-ui-react'

import {
  getSessions,
  createSession,
  deleteSession,
  updateSession }
  from '../../actions/sessions';

class CreateSessionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      height: 500,
      width: 600,
      modalOpen: false,
      errors: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true, errors: false })
  handleClose = () => this.setState({ modalOpen: false, errors: false })

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, height, width } = this.state;

    if (name === "") {
      this.setState({...this.state, errors: true})
      return false;
    }

    this.props.addNewSession({name: name, height: height, width: width, status: "New"});

    this.setState({name: '', height: 500, width: 600, modalOpen: false, errors: false});
  }


  render() {
    return (
      <Modal trigger={<Button onClick={this.handleOpen}>Create New</Button>}
             open={this.state.modalOpen}
             onClose={this.handleClose}>
        <Modal.Header>Create A New Session</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} error={this.state.errors}>
            <Form.Field>
              <label>Name</label>
              <Form.Input placeholder='Session Name'
                     onChange={this.handleChange}
                     name='name'
                     value={this.state.name}
                     required/>
              <label>Height</label>
              <Form.Input placeholder='Height'
                     onChange={this.handleChange}
                     name='height'
                     value={this.state.height}/>
              <label>Width</label>
              <Form.Input placeholder='Width'
                     onChange={this.handleChange}
                     name='width'
                     value={this.state.width}/>
              <Message
                error
                content='Enter a name!'
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.handleSubmit}>
            Submit <Icon name='right chevron'/>
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const DeleteSessionButton = (props) => {
  return (
    <Button negative
            onClick={() => props.deleteSession(props.sessionId)}>
      Delete
    </Button>
  )
};


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
      this.props.updateSession(session.id, {status: "Started"})
    }
  }

  renderSession(session) {
    const {id, name} = session;
    let createdAt = (new Date(session.createdAt)).toString();

    let text = null, color = null;
    if (session.status === "New") {
      text = "Start";
      color = "blue";
    }
    else {
      text = "Resume";
      color = "green";
    }
    return (
        <List.Item key={session.id}>
          <List.Content floated='right'>
            <Link to={`${this.props.match.url}/${id}`}>
              <Button onClick={() => this.onSessionStart(session)}
                      color={color}>
                {text}
              </Button>
            </Link>
            <DeleteSessionButton sessionId={id} deleteSession={this.props.deleteSession}/>
          </List.Content>
          <List.Content>
            <List.Header>{name}</List.Header>
            <List.Description>Created on {createdAt}</List.Description>
          </List.Content>
        </List.Item>
    )
  }

  render() {
    const renderedSessions = this.props.sessions.map(s => this.renderSession(s));

    return (
      <div style={{padding: "2.5em"}}>
        <h2 align="center">Sessions</h2>
        <CreateSessionModal addNewSession={this.props.addNewSession}/>
        <List divided verticalAlign='middle'>
          {renderedSessions}
        </List>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    sessions: state.sessions
})


const mapDispatchToProps = dispatch => ({
  loadSessions: () => dispatch(getSessions()),
  addNewSession: (body) => dispatch(createSession(body)),
  deleteSession: (sessionId) => dispatch(deleteSession(sessionId)),
  updateSession: (sessionId, body) => dispatch(updateSession(sessionId, body))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionsList))
