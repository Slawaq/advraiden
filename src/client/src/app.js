// import 'expose?$!expose?jQuery!jquery';
// import 'bootstrap-webpack!./bootstrap.config.js';
// import ko from 'knockout';

// window.ko = ko;

// import registerComponents from './app/components';
// import Api from './app/api';

// registerComponents(ko)(new Api());

import ReactDOM from 'react-dom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app/App'

const MaterialApp = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <App />
  </MuiThemeProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  // ko.applyBindings();
  ReactDOM.render(<MaterialApp />, document.getElementById('application'))
  injectTapEventPlugin();
});
