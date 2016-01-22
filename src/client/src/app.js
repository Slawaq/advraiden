import ko from 'knockout';

import Camping from './app/camping.js';

let viewModel = {
  companies: [
    new Camping({ title: 'Test' }),
    new Camping({ title: 'Heg' })
  ]
};

document.addEventListener('DOMContentLoaded', () => ko.applyBindings(viewModel));
