import loadTemplate from 'loadTemplateByUrl';
import campingForm from './campingForm/';
import camping from './camping/';
import link from './link/';
import main from './main/';

export default ko => api => {
  ko.components.loaders = [loadTemplate(ko)].concat(ko.components.loaders);

  campingForm(ko);
  link(ko);
  camping(ko);
  main(ko)(api);
};
