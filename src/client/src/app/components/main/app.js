import ko from 'knockout'
import linkGenerator from '../../../../../tool/linkGenerator'

class App {

  campaignings = ko.observableArray([]);
  loaded = ko.observable(false);

  constructor(api) {
    window.api = api //todo: remove (It was using for testing)
    this.api = api
    this.load(api)
  }

  async load(api) {
    let data = await api.all()
    this.campaignings(data.campaignings)
    this.linkGenerator = linkGenerator
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
      changeLink: ::this.api.changeLink,
      changePrice: ::this.api.changePrice,
      linkGenerator: this.linkGenerator,
      changeTitle: ::this.api.changeCampaigning,
      ...data
    }
  }

}

export default App
