'use strict';

class ApplicationState {

  constructor(loader, saver) {
    this.loader = loader;
    this.saver = saver;
    this.load();
  }

  getRedirectLink(redirectId) {
    return this.redirects[redirectId].to;
  }

  load() {
    let campaignings = this.loader('campaignings');
    let redirects = campaignings
      .reduce((r, campaigning) => {
        let links = campaigning
          .links
          .reduce((rr, link) => {
            rr[link.id] = link.to;
            return rr;
          }, {});
        r[campaigning.id] = links;
        return r;
      }, {});

    this.campaignings = campaignings;
    this.redirects = redirects;
  }

  update() {
    this.saver('campaignings')(this.campaignings);
  }  

  generateNextId(entities) {
    if (entities.length === 0) 
      return 0;

    return entities
      .slice(0) // copy, cuz sort creates side effects((
      .sort((a, b) => b.id - a.id)[0]
      .id + 1;
  }

}

module.exports = ApplicationState;
