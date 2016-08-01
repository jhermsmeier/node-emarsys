suite( 'IP Restrictions', function() {
  
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

})
