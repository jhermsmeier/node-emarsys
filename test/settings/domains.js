suite( 'Corporate Domains', function() {
  
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

})
