import ko from 'knockout';

export default class Form {

  name = ko.observable('');
  opened = ko.observable(false);

  constructor(props) {
    this.save = () => props.add(this.name());
  }

  open() {
    this.opened(true);
  }

}