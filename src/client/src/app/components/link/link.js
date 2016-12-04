class Link {

  constructor(props) {
    this.id = props.id
    this.source = props.source
    this.to = props.to
    this.removeDelegate = props.remove
  }

  getSourceView() {
    return this.source.replace(/^https?:\/\//, '') + '?subid=' + ADV_MACROS
  }

  getSourceLink() {
    return this.source + '?subid=' + ADV_MACROS
  }

  getDestinationView() {
    return this.to.replace(/^https?:\/\//, '')
  }

  getDestinationLink() {
    return this.to
  }

  async remove() {
    let accepted = confirm(`Remove link - ${this.getDestinationView()}?`)

    if (accepted)
      this.removeDelegate(this.id)
  }

}

export default Link
