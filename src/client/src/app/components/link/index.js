import Link from './link';
import view from './view.html';

export default ko => ko.components.register('relink', {
  viewModel: ({ props }) => new Link(props),
  template: { fromUrl: view },
});
