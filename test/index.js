var Emarsys = require( '..' )

global.assert = require( 'assert' )
global.client = null
global.scope = null

suite( 'Emarsys', function() {

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
      allowUnmocked: false,
    })

  })

  require( './settings' )

})
