export default class Api {

  all() {
    return jQuery.getJSON('/api/all')
  }

  addCampaigning(title) {
    return Promise.resolve(jQuery.ajax({
      method: 'POST', 
      url: '/api/campaigning', 
      data: JSON.stringify({ title }), 
      contentType:'application/json', 
      dataType: 'json'
    }))
  }

  removeCampaigning(id) {
    return Promise.resolve(jQuery.ajax({
      method: 'DELETE', 
      url: `/api/campaigning/${id}`, 
    }))
  }

  removeLink(id, linkId) {
    return Promise.resolve(jQuery.ajax({
      method: 'DELETE', 
      url: `/api/campaigning/${id}/link/${linkId}`, 
    }))
  }

  addLink(id, to) {
    return Promise.resolve(jQuery.ajax({
      method: 'POST', 
      url: `/api/campaigning/${id}/link`, 
      data: JSON.stringify({ to }), 
      contentType:'application/json', 
      dataType: 'json'
    }))
  }

  changeLink(id, linkId, to) {
    return Promise.resolve(jQuery.ajax({
      method: 'PUT',
      url: `/api/campaigning/${id}/link/${linkId}`, 
      data: JSON.stringify({ to }), 
      contentType:'application/json', 
      dataType: 'json'
    }))
  }

  changeCampaigning(id, title) {
    return Promise.resolve(jQuery.ajax({
      method: 'PUT',
      url: `/api/campaigning/${id}`, 
      data: JSON.stringify({ title }), 
      contentType:'application/json', 
      dataType: 'json'
    }))
  }

}
