import 'expose?$!expose?jQuery!jquery';
import 'bootstrap-webpack!./bootstrap.config.js';
import ko from 'knockout';

window.ko = ko;

import registerComponents from './app/components';
import Api from './app/api';

registerComponents(ko)(new Api());

document.addEventListener('DOMContentLoaded', () => ko.applyBindings());
