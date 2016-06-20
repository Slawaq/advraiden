import React, { Component } from 'react';
import { center, mt200 } from './center.css';

/* @flow */
class Center extends Component {

  render () {
    return (
      <div className={center,mt200}>
        {this.props.children}
      </div>
    );
  }

}

export default Center;