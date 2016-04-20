import ko from 'knockout';

class App {

  campaignings = ko.observable([]);
  loaded = ko.observable(false);

  constructor(api) {
    window.api = api;
    this.load(api);
  }

  async load(api) {
    let data = await api.all();
    this.campaignings(data.campaignings);
    this.loaded(true);
  }

  add(name) {
    this.campaignings([{
      title: name,
      id: (this.campaignings[0] || { id: 0 }).id + 1,
      links: []
    }].concat(this.campaignings))
  }
  
}

export default App;