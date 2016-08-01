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

  getSecuritySettings: function( callback ) {
    this._clientRequest({ url: 'settings/security' }, callback )
  },

  updateSecuritySettings: function( settings, callback ) {
    this._clientRequest({
      method: 'PUT',
      url: 'settings/security',
      body: settings
    }, callback )
  },

  getKeyring: function( callback ) {
    this._clientRequest({ url: 'settings/keyring/keys' }, callback )
  },

  getKey: function( keyId, callback ) {
    this._clientRequest({ url: 'settings/keyring/keys/' + keyId }, callback )
  },

  createKey: function( options, callback ) {
    this._clientRequest({
      method: 'POST',
      url: 'settings/keyring/keys',
      body: options
    }, callback )
  },

  deleteKey: function( keyId, callback ) {
    this._clientRequest({
      method: 'POST',
      url: 'settings/keyring/keys/' + keyId + '/delete'
    }, callback )
  },

  getAutoimports: function( callback ) {
    this._clientRequest({ url: '/settings/autoimports' }, callback )
  },

  getAutoimport: function( id, callback ) {
    this._clientRequest({ url: '/settings/autoimports/' + id }, callback )
  },

  createAutoimport: function( profile, callback ) {
    this._clientRequest({
      method: 'POST',
      url: '/settings/autoimports',
      body: profile
    }, callback )
  },

  deleteAutoimport: function( id, callback ) {
    this._clientRequest({
      method: 'POST',
      url: '/settings/autoimports/' + id + '/delete'
    }, callback )
  },

}
