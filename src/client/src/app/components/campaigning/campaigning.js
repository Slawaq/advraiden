import ko from 'knockout'
import Link from '../link/link'

export default class Campaigning {

  opened = ko.observable(false);
  editable = ko.observable(false);
  newTitle = ko.observable('');

  constructor(props) {
    this.props = props

    this.id = props.id
    this.linkGenerator = props.linkGenerator
    this.title = ko.observable(props.title)
    this.newTitle(this.title())
    this.links = ko.observableArray(props.links.map(::this.getLink))
    this.isZeroLinks = ko.computed(() => this.links().length === 0)
  }

  toggleOpen() {
    if (!this.editable())
      this.opened(!this.opened())
  }

  getLink (linkData) {
    return new Link({ 
      ...linkData, 
      source: this.linkGenerator(this.id)(linkData.id), 
      remove: ::this.removeLink,
      change: (...args) => this.props.changeLink(this.id, ...args)
    })
  }

  remove(_, event) {
    let accepted = confirm(`Remove ${this.title()} with ${this.links().length}?`)

    if (accepted)
      this.props.remove(this.id)

    event.stopPropagation()
    return false
  }

  toggleEdit(_, event) {
    this.editable(!this.editable())

    event.stopPropagation()
    return false
  }

  async edit() {
    await this.props.changeTitle(this.id, this.newTitle())
    this.editable(false)
    this.title(this.newTitle())
  }

  async removeLink(linkId) {
    await this.props.removeLink(this.id, linkId)
    this.links(this.links().filter(x => x.id !== linkId))
  }

  async addLink(to) {
    let link = await this.props.addLink(this.id, to)
    this.links.push(this.getLink(link))
  }

  getLinkFormProps() {
    return {
      add: ::this.addLink,
      placeholder: 'www...',
      title: 'ADD LINK'
    }
  }

}
