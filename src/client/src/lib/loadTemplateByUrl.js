import request from 'superagent-bluebird-promise';

let templateFromUrlLoader = ko => ({
  loadTemplate: (name, templateConfig, callback) => {
    if (templateConfig.fromUrl) {
      let fullUrl = templateConfig.fromUrl + '?cacheAge=' + (templateConfig.maxCacheAge || 2024);
      request
        .get(fullUrl)
        .then(({ text }) => {
          let templateHtml = text;
          ko.components.defaultLoader.loadTemplate(name, templateHtml, callback);
          return true;
        });
    } else {
      callback(null);
    }
  }
});

export default templateFromUrlLoader;
