import Campaigning from './campaigning'
import view from './view.html'
import './style.less'

export default ko => ko.components.register('campaigning', {
  viewModel: ({ props }) => new Campaigning(props),
  template: { fromUrl: view },
})
