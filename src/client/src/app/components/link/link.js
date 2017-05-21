import ko from 'knockout'
import copy from 'copy-to-clipboard'

class Link {

  constructor(props) {
    this.id = props.id
    this.source = props.source
    this.to = ko.observable(props.to)
    this.price = ko.observable(props.price || 0)
    this.newPrice = ko.observable(props.price || 0)
    this.removeDelegate = props.remove
    this.changeDelegate = props.change
    this.changePriceDelegate = props.changePrice
    this.copied = ko.observable(false)

    this.editable = ko.observable(false)
    this.saving = ko.observable(false)
    this.newDestination = ko.observable(this.to())
  }

  getSourceView() {
    return `${this.source.replace(/^https?:\/\//, '')}${this.getJoinSymbol()}subid=${ADV_MACROS}`
  }

  getSourceLink() {
    return `${this.source}${this.getJoinSymbol()}subid=${ADV_MACROS}`
  }

  getJoinSymbol() {
    return this.source.indexOf('?') > -1 
      ? '&' 
      : '?'
  }

  getDestinationView() {
    return this.to().replace(/^https?:\/\//, '')
  }

  getDestinationLink() {
    return this.to()
  }

  copy() {
    this.copied(copy(this.getSourceLink()))
    setTimeout(() => this.copied(false), 1000)
  }

  async remove() {
    let accepted = confirm(`Remove link - ${this.getDestinationView()}?`)

    if (accepted)
      this.removeDelegate(this.id)
  }

  toggleEdit () {
    this.editable(!this.editable())
  }

  async savePrice() {
    let newPrice = this.newPrice()

    if (newPrice.trim().length === 0 || parseInt(newPrice.trim(), 10) < 0)
      return

    let accepted = confirm(`Change price from ${this.price()} to ${newPrice}?`)

    if (accepted) {
      this.saving(true)
      await this.changePriceDelegate(this.id, newPrice)
      this.saving(false)
      this.editable(false)
      this.price(newPrice)
    } else {
      this.editable(false)
      this.newPrice(this.price())
    }
  }

  async save() {
    let newDestination = this.newDestination()

    if (newDestination.trim().length === 0)
      return

    let accepted = confirm(`Change link from ${this.getDestinationLink()} to ${newDestination}?`)

    if (accepted) {
      this.saving(true)
      await this.changeDelegate(this.id, newDestination)
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
