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
      allowUnmocked: false,
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
      assert.deepEqual( settings, payload.data )
      done( error )
    })

  })

  test( 'get corporate domains', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": [
        "example.com"
      ]
    }

    scope && scope.get( '/settings/corporatedomain' )
      .reply( 200, payload )

    client.getCorporateDomains( function( error, settings ) {
      assert.deepEqual( settings, payload.data )
      done( error )
    })

  })

  test( 'update a corporate domain', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": null
    }

    var postData = {
      "domains": [
        "example.com"
      ]
    }

    scope && scope.put( '/settings/corporatedomain', postData )
      .reply( 200, payload )

    client.updateCorporateDomain([ 'example.com' ], done )

  })

  test( 'get IP restrictions', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": [
        {
          "range_start": "8.8.8.8",
          "range_end": "8.8.8.8"
        },
        {
          "range_start": "8.8.4.4",
          "range_end": "8.8.4.4"
        }
      ]
    }

    scope && scope.get( '/settings/iprestrictions' )
      .reply( 200, payload )

    client.getIpRestrictions( function( error, data ) {
      assert.deepEqual( data, payload.data )
      done( error )
    })

  })

  test( 'update IP restrictions', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": [
        {
          "range_start": "8.8.8.8",
          "range_end": "8.8.8.8"
        },
        {
          "range_start": "8.8.4.4",
          "range_end": "8.8.4.4"
        }
      ]
    }

    scope && scope.put( '/settings/iprestrictions' )
      .reply( 200, payload )

    var ranges = [{
      range_start: "8.8.8.8",
      range_end: "8.8.8.8"
    }, {
      range_start: "8.8.4.4",
      range_end: "8.8.4.4"
    }]

    client.updateIpRestrictions( ranges, function( error, data ) {
      assert.deepEqual( data, payload.data )
      done( error )
    })

  })

})
