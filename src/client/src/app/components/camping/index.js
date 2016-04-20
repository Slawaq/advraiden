import Camping from './camping';
import view from './view.html';
import './style.less';

export default ko => ko.components.register('camping', {
  viewModel: ({ props }) => new Camping(props),
  template: { fromUrl: view },
});
