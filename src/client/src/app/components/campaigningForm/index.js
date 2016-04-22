import Form from './form';
import view from './view.html';

export default ko => ko.components.register('campaigning-form', {
    viewModel: ({ props }) => new Form(props),
    template: { fromUrl: view },
  });
