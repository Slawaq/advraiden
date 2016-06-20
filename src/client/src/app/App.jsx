import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import Center from './components/shared/center/Center';

export default class App extends Component {

  render () {
    return (
      <Center>
        <CircularProgress size={2} />
      </Center>
    );
  }

}