import React, { Component } from 'react';
import { Button, Form, Input, Label } from 'semantic-ui-react';
import './index.css';

class CreateObjects extends Component {
  constructor(props) {
    super(props);
    this.state = { numObjects: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ numObjects: event.target.value });
  }

  handleSubmit(event) {
    const body = { num_objects: this.state.numObjects };
    this.props.createObjects(this.props.sessionId, body);
    event.preventDefault();
  }

  render() {
    const { unpackedObjects } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group inline>
          <Label
            style={{ fontSize: 'inherit' }}
          >
            {unpackedObjects.length}
          </Label>
          <Form.Field>
            <Input
              className="create-input"
              value={this.state.objects}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button circular icon="plus" />
        </Form.Group>
      </Form>
    );
  }
}

export default CreateObjects;
