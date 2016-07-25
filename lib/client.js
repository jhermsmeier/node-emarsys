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

  getSettings: function( callback ) {

    var self = this
    var done = callback.bind( this )

    var req = this._request( 'settings', {
      headers: {
        'X-WSSE': this.token.toString(),
      },
    }, function( error, res, data ) {
      debug( 'request %s', res.request.uri.href )
      debug( 'request:headers', res.request.headers )
      debug( 'response %s %s: %s', res.statusCode, res.statusMessage, res.request.uri.href )
      debug( 'response:headers', res.headers )
      debug( 'settings', error || data )
      self.settings = data
      done( error, data )
    })

  }

}

// Exports
module.exports = Client
