import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'

import { createPackingObjects } from '../../actions'
import './index.css'


class CreateObjectsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {numObjects: 0};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({numObjects: event.target.value});
  }

  handleSubmit(event) {
    const body = {num_objects: this.state.numObjects};
    this.props.createObjects(body);
    event.preventDefault();
  }

  render() {
    const { unpackedObjects } = this.props;
    return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group class="inline fields">
            <a class="ui basic blue label" style={{fontSize: "inherit"}}>
              {unpackedObjects.length}
            </a>
            <Form.Field>
                <input className="CreateInput"
                       type="text"
                       value={this.state.objects}
                       onChange={this.handleChange}
                       placeholder="add more"/>
            </Form.Field>
            <button class="circular ui icon button">
              <i class="icon plus"></i>
            </button>
          </Form.Group>
        </Form>
    )
  }
}

CreateObjectsForm.propTypes = {
  createObjects: PropTypes.func.isRequired,
  unpackedObjects: PropTypes.array.isRequired
};


const mapStateToProps = state => {
  return {
    unpackedObjects: state.packingObjects.unpackedObjects
  }
}


const mapDispatchToProps = dispatch => ({
  createObjects: (body) => dispatch(createPackingObjects(body)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateObjectsForm)