import loadTemplate from 'loadTemplateByUrl';
import campaigningForm from './campaigningForm/';
import campaigning from './campaigning/';
import main from './main/';

export default ko => api => {
  ko.components.loaders = [loadTemplate(ko)].concat(ko.components.loaders);

  campaigningForm(ko);
  campaigning(ko);
  main(ko)(api);
};
