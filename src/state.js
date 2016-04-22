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
    this.campaignings = this.loader('campaignings');
    this.redirects = this.campaignings
      .map(c => c.links)
      .reduce((r, links) => r.concat(links), [])
      .reduce((r, link) => {
        r[link.uuid] = link;
        return r;
      }, {});
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
