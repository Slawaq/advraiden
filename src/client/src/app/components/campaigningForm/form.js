import ko from 'knockout';

export default class Form {

  name = ko.observable('');
  opened = ko.observable(false);
  saving = ko.observable(false);

  constructor(props) {
    this.props = props;

    this.placeholder = props.placeholder || 'NAME';
    this.title = props.title || 'ADD';
  }

  open() {
    this.opened(true);
  }

  save() {
    let name = this.name().trim();

    if (name.length === 0) 
      return;

    this.saving(true);
    this.props
        .add(name)
        .then(::this.clear)
        .catch(_ => alert('ERROR') || this.clear());
  }

  clear() {
    this.saving(false); 
    this.opened(false); 
    this.name('');
  }

}