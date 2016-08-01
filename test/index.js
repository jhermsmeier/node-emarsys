var assert = require( 'assert' )
var Emarsys = require( '..' )

suite( 'Emarsys', function() {

  var client = null
  var scope = null

  suiteSetup( 'init client', function() {

    client = new Emarsys.Client({
      user: process.env['EMARSYS_USER'] || 'username',
      secret: process.env['EMARSYS_SECRET'] || 'secret',
    })

    assert.ok( client )
    assert.ok( client instanceof Emarsys.Client )

  })

  suiteSetup( 'http request mocks', function() {

    if( process.env['NO_MOCK'] )
      return void 0

    var nock = require( 'nock' )

    scope = nock( client.options.baseUrl, {
      allowUnmocked: true,
    })

  })

  test( 'get client settings', function( done ) {

    var payload = {
      id: 000000000,
      environment: 'suite9.emarsys.net',
      timezone: 'Europe/Vienna',
      name: 'orgname',
      password_history_queue_size: 1,
      country: 'Deutschland'
    }

    scope && scope.get( '/settings' )
      .reply( 200, payload )

    client.getSettings( function( error, settings ) {
      console.log( client )
      console.log( settings )
      done( error )
    })

  })

})
