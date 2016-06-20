import ko from 'knockout'

class App {

  campaignings = ko.observableArray([]);
  loaded = ko.observable(false);

  constructor(api) {
    window.api = api //todo: remove (It was used for test)
    this.api = api
    this.load(api)
  }

  async load(api) {
    let data = await api.all()
    this.campaignings(data.campaignings)
    this.linkGenerator = campaigningId => id => `${data.publicRedirect}/${campaigningId}/${id}`
    this.loaded(true)
  }
  
  async removeCampaigning(id) {
    await this.api.removeCampaigning(id)
    this.campaignings(this.campaignings().filter(x => x.id !== id))
  }

  async add(title) {
    let campaigning =  await this.api.addCampaigning(title)
    this.campaignings.push(campaigning)
  }

  generateCampaigningProps(data) {
    return {
      remove: ::this.removeCampaigning,
      removeLink: ::this.api.removeLink,
      addLink: ::this.api.addLink,
      linkGenerator: this.linkGenerator,
      ...data
    }
  }

}

export default App
