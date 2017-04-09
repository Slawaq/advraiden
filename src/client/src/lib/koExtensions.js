let fadeVisible = ko => {
  let $ = jQuery
  ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
      // Initially set the element to be instantly visible/hidden depending on the value
      let value = valueAccessor()
      $(element).toggle(ko.unwrap(value)) // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
      // Whenever the value subsequently changes, slowly fade the element in or out
      let value = valueAccessor()
      ko.unwrap(value) ? $(element).fadeIn() : $(element).hide()
    }
  }
}

export default fadeVisible
