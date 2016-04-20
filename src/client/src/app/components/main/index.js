import App from './app';
import view from './view.html';

export default ko => api => ko.components.register('app', {
  viewModel: () => new App(api),
  template: { fromUrl: view },
});
