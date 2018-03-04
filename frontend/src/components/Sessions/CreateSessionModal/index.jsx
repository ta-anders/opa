import React, { Component } from 'react';
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';

const initialState = {
  name: '',
  height: 500,
  width: 600,
  modalOpen: false,
  errors: false,
};

class CreateSessionModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true, errors: false });
  }

  handleClose() {
    this.setState({ modalOpen: false, errors: false });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { name, height, width } = this.state;

    if (name === '') {
      this.setState({ ...this.state, errors: true });
      return false;
    }

    this.props.addNewSession(
      { name: name, height: height, width: width, status: 'New' },
    );

    this.setState({ ...initialState });
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Create New</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Create A New Session</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} error={this.state.errors}>
            <Form.Field>
              <Form.Input
                placeholder="Session Name"
                onChange={this.handleChange}
                name="name"
                label="Name"
                value={this.state.name}
                required
              />
              <Form.Input
                placeholder="Height"
                onChange={this.handleChange}
                name="height"
                label="Height"
                value={this.state.height}
                required
              />
              <Form.Input
                placeholder="Width"
                onChange={this.handleChange}
                name="width"
                label="Width"
                value={this.state.width}
                required
              />
              <Message
                error
                content="Enter a name!"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.handleSubmit}>
            Submit <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CreateSessionModal;
