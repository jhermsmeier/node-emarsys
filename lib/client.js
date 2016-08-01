var Emarsys = require( './emarsys' )
var WSSEToken = require( 'wsse-token' )
var extend = require( 'extend' )
var request = require( 'request' )
var info = require( '../package.json' )
var debug = require( 'debug' )( 'emarsys:client' )

/**
 * Client
 * @param {Object} options
 * @return {Client}
 */
function Client( options ) {

  if( !(this instanceof Client ) )
    return new Client( options )

  this.options = extend( true, {}, Client.defaults, options )
  this.token = new WSSEToken({
    user: options.user,
    password: options.secret,
  })

  this.rateLimit = null
  this.rateLimitReset = null
  this.rateLimitRemaining = null

  this._request = request.defaults({
    json: true,
    gzip: true,
    forever: true,
    strictSSL: true,
    encoding: 'utf8',
    headers: this.options.headers,
    baseUrl: this.options.baseUrl
  })

}

/**
 * Default options
 * @type {Object}
 */
Client.defaults = {
  user: '',
  secret: '',
  baseUrl: 'https://api.emarsys.net/api/v2/',
  headers: {
    'user-agent': process.release.name + '/' + process.versions.node +
      ' ' + info.name + '/' + info.version,
  },
}

/**
 * Client prototype
 * @type {Object}
 */
Client.prototype = {

  constructor: Client,

  _clientRequest: function( options, callback ) {

    var self = this

    options = extend( true, options, {
      headers: {
        'X-WSSE': this.token.toString(),
      },
    })

    return this._request( options, function( error, res, body ) {

      if( res ) {
        debug( 'http %s %s', res.request.method, res.request.uri.href )
        debug( 'http request headers', res.request.headers )
        debug( 'http %s %s: %s', res.statusCode, res.statusMessage, res.request.uri.href )
        debug( 'http response headers', res.headers )
        self.rateLimit = parseInt( res.headers['x-ratelimit-limit'], 10 )
        self.rateLimitReset = new Date( parseInt( res.headers['x-ratelimit-reset'], 10 ) * 1000 )
        self.rateLimitRemaining = parseInt( res.headers['x-ratelimit-remaining'], 10 )
      }

      if( error ) {
        debug( 'http error', error.message )
        return void callback.call( self, error, body )
      }

      if( res.statusCode < 200 || res.statusCode >= 300 ) {
        error = new Error( res.statusMessage )
        error.detail = body
        debug( 'http error', error.message )
      }

      callback.call( self, error, body && body.data )

    })

  },

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

// Exports
module.exports = Client
