import ko from 'knockout';

export default class Camping {

  opened = ko.observable(false);

  constructor(data) {
    this.id = data.id;
    this.title = ko.observable(data.title);
    this.links = ko.observable(data.links);
    this.isZeroLinks = ko.computed(() => this.links().length === 0);
  }

  toggleOpen() {
    this.opened(!this.opened());
  }

}
