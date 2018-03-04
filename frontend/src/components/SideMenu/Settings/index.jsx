import React, { Component } from 'react';
import { Button, Checkbox, Form, Icon, Modal, Popup } from 'semantic-ui-react';

class SettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.settings };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  handleToggle(e, { name }) {
    this.setState({ [name]: !this.state[name] });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { enableTooltips } = this.state;
    this.props.updateSettings(this.props.sessionId, { enableTooltips });
    this.handleClose();
  }

  render() {
    return (
      <Modal
        trigger={
          <Popup
            trigger={
              <Button
                circular
                size="large"
                icon="settings"
                onClick={this.handleOpen}
              />
            }
            content="Settings"
            position="right center"
            open={this.state.enableTooltips ? undefined : false}
          />
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Update OPA Settings</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Checkbox
                toggle
                checked={this.state.enableTooltips}
                onChange={this.handleToggle}
                name="enableTooltips"
                label="Enable tooltips"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.handleSubmit}>
            Save <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SettingsModal;
