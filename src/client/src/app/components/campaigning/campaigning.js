import ko from 'knockout';

export default class Campaigning {

  opened = ko.observable(false);

  constructor(props) {
    this.id = props.id;
    this.title = ko.observable(props.title);
    this.links = ko.observableArray(props.links);
    this.isZeroLinks = ko.computed(() => this.links().length === 0);

    this.props = props;
  }

  toggleOpen() {
    this.opened(!this.opened());
  }

  remove(_, event) {
    let accepted = confirm(`Remove ${this.title()} with ${this.links().length}?`);

    if (accepted)
      this.props.remove(this.id);

    event.stopPropagation();
    return false;
  }

  removeLink(link) {
    let accepted = confirm(`Remove link - ${link.to}?`);

    if (accepted)
      this.props
          .removeLink(this.id, link.id)
          .then(_ => this.links(this.links().filter(x => x.id !== link.id)));
  }

  async addLink(to) {
    let link = await this.props.addLink(this.id, to);
    this.links.push(link);
  }

  getLinkFormProps() {
    return {
      add: ::this.addLink,
      placeholder: 'http://...',
      title: 'ADD LINK'
    }
  }

}
