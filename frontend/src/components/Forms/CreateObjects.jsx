import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
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
    return (
      <form className="CreateForm" onSubmit={this.handleSubmit}>
        <label>
          Create More:
          <input className="CreateInput" type="text" value={this.state.objects} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

CreateObjectsForm.propTypes = {
  createObjects: PropTypes.func.isRequired
};


const mapDispatchToProps = dispatch => ({
  createObjects: (body) => dispatch(createPackingObjects(body)),
});


export default connect(null, mapDispatchToProps)(CreateObjectsForm)