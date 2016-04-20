'use strict';

class ApplicationState {

  constructor(loader) {
    this.loader = loader;
    this.load();
  }

  getRedirectLink(redirectId) {
    return this.redirects[redirectId].to;
  }

  load() {
    this.campaignings = this.loader('campaignings');
    this.redirects = this.campaignings
      .map(c => c.links)
      .reduce((r, links) => r.concat(links), [])
      .reduce((r, link) => {
        r[link.uuid] = link;
        return r;
      }, {});
  }

}

module.exports = ApplicationState;
