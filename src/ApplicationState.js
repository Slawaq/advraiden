'use strict'

class ApplicationState {

  constructor(loader, saver) {
    this.loader = loader
    this.saver = saver
    this.load()
  }

  getRedirectLink(redirectId) {
    return this.redirects[redirectId].to
  }

  async load() {
    let campaignings = await this.loader('campaignings')
    let redirects = campaignings
      .reduce((r, campaigning) => {
        let links = campaigning
          .links
          .reduce((rr, link) => {
            rr[link.id] = { to: link.to, price: link.price }
            return rr
          }, {})
        r[campaigning.id] = links
        r[campaigning.id].title = campaigning.title
        return r
      }, {})

    this.campaignings = campaignings
    this.redirects = redirects
  }

  async update() {
    await this.saver('campaignings')(this.campaignings)
  }  

  generateNextId(entities) {
    if (entities.length === 0) 
      return 0

    return entities
      .slice(0) // copy, cuz sort creates side effects((
      .sort((a, b) => b.id - a.id)[0]
      .id + 1
  }

}

module.exports = ApplicationState
