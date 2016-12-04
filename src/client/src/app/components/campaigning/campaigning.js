import ko from 'knockout'
import Link from '../link/link'

export default class Campaigning {

  opened = ko.observable(false);

  constructor(props) {
    this.id = props.id
    this.linkGenerator = props.linkGenerator
    this.title = ko.observable(props.title)
    this.links = ko.observableArray(props.links.map(::this.getLink))
    this.isZeroLinks = ko.computed(() => this.links().length === 0)

    this.props = props
  }

  toggleOpen() {
    this.opened(!this.opened())
  }

  getLink (linkData) {
    return new Link({ 
      ...linkData, 
      source: this.linkGenerator(this.id)(linkData.id), 
      remove: ::this.removeLink
    })
  }

  remove(_, event) {
    let accepted = confirm(`Remove ${this.title()} with ${this.links().length}?`)

    if (accepted)
      this.props.remove(this.id)

    event.stopPropagation()
    return false
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
