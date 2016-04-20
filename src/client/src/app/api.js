export default class Api {

  all() {
    return jQuery.getJSON('/api/all');
  }

  addCampaigning(title) {
    return jQuery.ajax({
      method: 'POST', 
      url: '/api/campaigning', 
      data: JSON.stringify({ title }), 
      contentType:'application/javascript', 
      dataType: 'json'
    });
  }

}
