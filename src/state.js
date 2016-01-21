'use strict';

class ApplicationState {

  constructor(loader) {
    this.lodaer = loader;
    this.load();
  }

  getRedirectLink(redirectId) {
    return this.redirects[redirectId].to;
  }

  load() {
    this.campings = this.lodaer('campings');
    this.redirects = this.campings
      .map(c => c.links)
      .reduce((r, links) => r.concat(links), [])
      .reduce((r, link) => {
        r[link.uuid] = link;
        return r;
      }, {});
  }

}

module.exports = ApplicationState;
