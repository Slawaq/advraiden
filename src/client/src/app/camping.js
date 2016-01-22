import ko from 'knockout';

export default class Camping {
  constructor(data) {
    this.title = ko.observable(data.title);
  }
}
