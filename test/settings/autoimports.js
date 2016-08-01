suite( 'Autoimports', function() {

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
