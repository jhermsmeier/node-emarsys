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
      "replyCode": 0,
      "replyText": "OK",
      "data": {
        "id": 000000000,
        "environment": "suite9.emarsys.net",
        "timezone": "Europe/Vienna",
        "name": "orgname",
        "password_history_queue_size": 1,
        "country": "Deutschland"
      }
    }

    scope && scope.get( '/settings' )
      .reply( 200, payload )

    client.getSettings( function( error, settings ) {
      assert.deepEqual( settings, payload.data )
      done( error )
    })

  })

  test( 'get deliverability settings', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": {
        "return_path_domain": "xpressus.emsmtp.com",
        "sender_domains": [
          "eemms.net",
          "reply.example.com"
        ],
        "link_domains": [],
        "senders": [
          "example_corp@eemms.net",
          "test@reply.example.com",
        ],
        "sending_group": "760",
        "pmtas": [
          "e3uspmta9-v33",
          "e3uspmta10-v33",
          "suitepmta01-v33",
          "suitepmta02-v33",
          "e3uspmta1-v33",
          "e3uspmta2-v33",
          "e3uspmta3-v33",
          "e3uspmta4-v33"
        ]
      }
    }

    scope && scope.get( '/settings/deliverability' )
      .reply( 200, payload )

    client.getDeliverySettings( function( error, settings ) {
      console.log( settings )
      assert.deepEqual( settings, payload.data )
      done( error )
    })

  })

})
