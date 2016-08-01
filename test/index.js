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
      "data": [{
        "range_start": "8.8.8.8",
        "range_end": "8.8.8.8"
      },{
        "range_start": "8.8.4.4",
        "range_end": "8.8.4.4"
      }]
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
      "data": [{
        "range_start": "8.8.8.8",
        "range_end": "8.8.8.8"
      },{
        "range_start": "8.8.4.4",
        "range_end": "8.8.4.4"
      }]
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

  test( 'get keyring', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": [{
        "id": "4",
        "comment": "test",
        "created": "2016-08-01 18:55:22"
      }]
    }

    scope && scope.get( '/settings/keyring/keys' )
      .reply( 200, payload )

    client.getKeyring( function( error, data ) {
      assert.deepEqual( data, payload.data )
      done( error )
    })

  })

  test( 'get a key by id', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": {
        "id": "3",
        "comment": "test",
        "created": "2016-08-01 16:27:21",
        "ssh_fingerprint": "SHA1:baI3HSqaxmb2XwR3Ou1ul2JPtlU",
        "ssh_public_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDDBk9Ma73o6g4hBjySKdTnk7GvHdIe6XBhsjWs8PeBjZ59YIFwBN7FFj7u+q6fkfQvGhmyxAAIZACC4IXkLJyx7YhwTDTtFZNI/QE325OWQ/1R/pUV9H1LD5yBRgNPgsfL4nruQRsD+iWnnTQ0w9umrvc5sYRvsOTKrKg/DDBJESffwPt/O+xqKTmdrEZrXSzOkM+kddE9g/IR5I2rNrCd2MkC+IBDiZ1uTnnx7SgnbJyHrFL5aGP11ONUV70BdLUcTkpnGY7zdZ1SsnHIY3sz4ROOHcDEME1F26kTOh8lVfRvacFVjapktC68l/USKR00/3LGhiCocy4D1XsXgRop72g8dqc3ylh24cfVa4e/REIOBZrY6xm8HrVk5esMBBar2S1bucMkdpYyTj+clzeTvv1aTCck62/mhRnLkuOOcD2QKh4LHe9mNXYgf0rPVv0Mm+FUT0SYzVxPvb83NIfg/e/DHOaX/zXy0nT5VqQdqaoK6M6B9bZUP8A5d7TPUmlF8l5ssaqI5Ufo8IwhaCrSezzyH2+0DkXjkHLUnE138drdTZo3pAQjtzNA5UcQ6TInlelnH0n/YKlmXqwkP2phJJZ/J/TwjakNzE3+4VlgBIcw/oqwxoW8lu3V7locIv3TeCm9Ayf7ob74kFgoVGIWLGko1pHFC2owLrT06gwquQ== test"
      }
    }

    scope && scope.get( '/settings/keyring/keys/3' )
      .reply( 200, payload )

    client.getKey( 3, function( error, data ) {
      assert.deepEqual( data, payload.data )
      done( error )
    })

  })

  test( 'get a non-existant key by id', function( done ) {

    var payload = {
      "replyCode": 4801,
      "replyText": "The selected keyring item ID not found.",
      "data": ""
    }

    scope && scope.get( '/settings/keyring/keys/1' )
      .reply( 404, payload )

    client.getKey( 1, function( error, data ) {
      assert.deepEqual( data, payload.data )
      assert.ok( error instanceof Error )
      assert.equal( error.message, payload.replyText )
      done()
    })

  })

  test( 'create a new key', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": {
        "id": "3",
        "comment": "test",
        "created": "2016-08-01 16:27:21",
        "ssh_fingerprint": "SHA1:baI3HSqaxmb2XwR3Ou1ul2JPtlU",
        "ssh_public_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDDBk9Ma73o6g4hBjySKdTnk7GvHdIe6XBhsjWs8PeBjZ59YIFwBN7FFj7u+q6fkfQvGhmyxAAIZACC4IXkLJyx7YhwTDTtFZNI/QE325OWQ/1R/pUV9H1LD5yBRgNPgsfL4nruQRsD+iWnnTQ0w9umrvc5sYRvsOTKrKg/DDBJESffwPt/O+xqKTmdrEZrXSzOkM+kddE9g/IR5I2rNrCd2MkC+IBDiZ1uTnnx7SgnbJyHrFL5aGP11ONUV70BdLUcTkpnGY7zdZ1SsnHIY3sz4ROOHcDEME1F26kTOh8lVfRvacFVjapktC68l/USKR00/3LGhiCocy4D1XsXgRop72g8dqc3ylh24cfVa4e/REIOBZrY6xm8HrVk5esMBBar2S1bucMkdpYyTj+clzeTvv1aTCck62/mhRnLkuOOcD2QKh4LHe9mNXYgf0rPVv0Mm+FUT0SYzVxPvb83NIfg/e/DHOaX/zXy0nT5VqQdqaoK6M6B9bZUP8A5d7TPUmlF8l5ssaqI5Ufo8IwhaCrSezzyH2+0DkXjkHLUnE138drdTZo3pAQjtzNA5UcQ6TInlelnH0n/YKlmXqwkP2phJJZ/J/TwjakNzE3+4VlgBIcw/oqwxoW8lu3V7locIv3TeCm9Ayf7ob74kFgoVGIWLGko1pHFC2owLrT06gwquQ== test"
      }
    }

    var postData = {
      "comment": "test"
    }

    scope && scope.post( '/settings/keyring/keys', postData )
      .reply( 200, payload )

    client.createKey({
      comment: 'test'
    }, function( error, data ) {
      assert.deepEqual( data, payload.data )
      done( error )
    })

  })

  test( 'delete a key', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": ""
    }

    scope && scope.post( '/settings/keyring/keys/3/delete' )
      .reply( 200, payload )

    client.deleteKey( 3, function( error, data ) {
      assert.strictEqual( data, payload.data )
      done( error )
    })

  })

  test( 'get autoimports', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": [{
        "id": 667,
        "name": "emarsys import"
      }]
    }

    scope && scope.get( '/settings/autoimports' )
      .reply( 200, payload )

    client.getAutoimports( function( error, data ) {
      assert.deepEqual( data, payload.data )
      done( error )
    })

  })

  test( 'get autoimport by id', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": {
        "separator": ";",
        "date_format": "YYYY-MM-DD",
        "fieldnames": true,
        "optin": "Status not defined",
        "customers": "",
        "as_list": true,
        "userlist_name": "emarsys import",
        "newsletter": false,
        "default_language": "English",
        "duplication_handling": "e",
        "overwrite": true,
        "text_separator": "\"",
        "skip_empty": false,
        "update_only": false,
        "name_from_filename": "0",
        "external_keys": [ 3 ],
        "file_pattern": "emarsys.csv",
        "source": "sftp://emarsys:XXXXXXXXXXXX=?#@0.0.0.0/writeable/emarsys.csv",
        "archive_pattern": "",
        "archive_password": "",
        "enabled": true,
        "fields": [{
          "id": "2",
          "field_name": "Gender",
          "is_key": false,
          "element_name": "Gender",
          "element_id": "5",
          "values": [{
            "value": "female",
            "choice": "Female"
          },{
            "value": "male",
            "choice": "Male"
          }]
        },{
          "id": "3",
          "field_name": "First name",
          "is_key": false,
          "element_name": "First Name",
          "element_id": "1",
          "values": []
        },{
          "id": "4",
          "field_name": "Last name",
          "is_key": false,
          "element_name": "Last Name",
          "element_id": "2",
          "values": []
        },{
          "id": "5",
          "field_name": "email",
          "is_key": true,
          "element_name": "Email",
          "element_id": "3",
          "values": []
        },{
          "id": "10",
          "field_name": "Opt-in",
          "is_key": false,
          "element_name": "Opt-In",
          "element_id": "31",
          "values": [{
            "value": "true",
            "choice": "True"
          }]
        }]
      }
    }

    scope && scope.get( '/settings/autoimports/667' )
      .reply( 200, payload )

    client.getAutoimport( 667, function( error, data ) {
      assert.deepEqual( data, payload.data )
      done( error )
    })

  })

  test.skip( 'create new autoimport profile', function( done ) {

    var payload = {
      "replyCode": 0,
      "replyText": "OK",
      "data": [{
        "id": 667,
        "name": "emarsys import"
      }]
    }

    var postData = {
      "fields": {},
      "separator": "",
      "language": "",
      "date_format": "",
      "optin": "",
      "userlist_name": "",
      "text_separator": "",
      "file_pattern": "",
      "source": "",
      "fieldnames": false,
      "as_list": false,
      "newsletter": false,
      "skip_empty": false,
      "update_only": false,
      "enabled": false
    }

    scope && scope.post( '/settings/autoimports', postData )
      .reply( 200, payload )

    var profile = {
      fields: {},
      separator: "",
      language: "",
      dateFormat: "",
      optin: "",
      userlistName: "",
      textSeparator: "",
      filePattern: "",
      source: "",
      fieldnames: false,
      asList: false,
      newsletter: false,
      skipEmpty: false,
      updateOnly: false,
      enabled: false
    }

    client.createAutoimport( profile, function( error, data ) {
      assert.deepEqual( data, payload.data )
      done( error )
    })

  })

  test.skip( 'delete an autoimport profile', function( done ) {

    var payload = null

    scope && scope.post( '/settings/autoimports/12345/delete' )
      .reply( 200, payload )

    client.deleteAutoimport( 12345, function( error, data ) {
      assert.deepEqual( data, payload.data )
      done( error )
    })

  })

})
