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
  this.settings = null
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

    return this._request( 'settings', {
      headers: {
        'X-WSSE': this.token.toString(),
      },
    }, function( error, res, data ) {

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
        return void callback.call( self, error, data )
      }

      if( res.statusCode < 200 || res.statusCode >= 300 ) {
        error = new Error( res.statusMessage )
        error.detail = data
        debug( 'http error', error.message )
      }

      callback.call( self, error, data )

    })

  },

  getSettings: function( callback ) {

    var self = this
    var done = callback.bind( this )

    var req = this._clientRequest( 'settings', function( error, res, data ) {
      debug( 'settings', data )
      self.settings = data
      done( error, data )
    })

  },

}

// Exports
module.exports = Client
