import ko from 'knockout'

class Link {

  constructor(props) {
    this.id = props.id
    this.source = props.source
    this.to = ko.observable(props.to)
    this.removeDelegate = props.remove
    this.changeDelegate = props.change

    this.editable = ko.observable(false)
    this.saving = ko.observable(false)
    this.newDestination = ko.observable(this.to())
  }

  getSourceView() {
    return this.source.replace(/^https?:\/\//, '') + '?subid=' + ADV_MACROS
  }

  getSourceLink() {
    return this.source + '?subid=' + ADV_MACROS
  }

  getDestinationView() {
    return this.to().replace(/^https?:\/\//, '')
  }

  getDestinationLink() {
    return this.to()
  }

  async remove() {
    let accepted = confirm(`Remove link - ${this.getDestinationView()}?`)

    if (accepted)
      this.removeDelegate(this.id)
  }

  toggleEdit () {
    this.editable(!this.editable())
  }

  async save() {
    let newDestination = this.newDestination()

    if (newDestination.trim().length === 0)
      return

    let accepted = confirm(`Change link from ${this.getDestinationLink()} to ${newDestination}?`)

    if (accepted) {
      this.saving(true)
      let res = await this.changeDelegate(this.id, newDestination)
      this.saving(false)
      this.editable(false)
      this.to(newDestination)
    } else {
      this.editable(false)
      this.newDestination(this.to())
    }
  }

}

export default Link
