module.exports = {
  
  getSettings: function( callback ) {
    this._clientRequest({ url: 'settings' }, callback )
  },

  getDeliverySettings: function( callback ) {
    this._clientRequest({ url: 'settings/deliverability' }, callback )
  },

  getCorporateDomains: function( callback ) {
    this._clientRequest({ url: 'settings/corporatedomain' }, callback )
  },

  updateCorporateDomain: function( domains, callback ) {
    this._clientRequest({
      method: 'PUT',
      url: 'settings/corporatedomain',
      body: { domains: domains }
    }, callback )
  },

  getIpRestrictions: function( callback ) {
    this._clientRequest({ url: 'settings/iprestrictions' }, callback )
  },

  updateIpRestrictions: function( ranges, callback ) {
    this._clientRequest({
      method: 'PUT',
      url: 'settings/iprestrictions',
      body: ranges
    }, callback )
  },
  
}
