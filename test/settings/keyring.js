suite( 'Keyring', function() {
  
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

})
