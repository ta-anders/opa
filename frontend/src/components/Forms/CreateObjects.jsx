import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Button, Form, Label, Input } from 'semantic-ui-react';

import { createPackingObjects } from '../../actions/packingObjects';
import './index.css';

class CreateObjectsForm extends Component {
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
              className="CreateInput"
              type="text"
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

const mapStateToProps = state => ({
  unpackedObjects: state.packingObjects.filter(record => (!record.packed)),
});

const mapDispatchToProps = dispatch => ({
  createObjects: (sessionId, body) => dispatch(
    createPackingObjects(sessionId, body),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateObjectsForm);
