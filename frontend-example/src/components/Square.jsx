import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Square.css';

export default class Square extends Component {
  static propTypes = {
    black: PropTypes.bool
  };

  render() {
    const { black } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return (
      <div className="Square" style={{
        backgroundColor: fill,
        color: stroke,
        display: 'flex',
        justifyContent: 'center'
      }}>
        {this.props.children}
      </div>
    );
  }
}