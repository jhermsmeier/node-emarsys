# Emarsys
[![npm](https://img.shields.io/npm/v/emarsys.svg?style=flat-square)](https://npmjs.com/package/emarsys)
[![npm license](https://img.shields.io/npm/l/emarsys.svg?style=flat-square)](https://npmjs.com/package/emarsys)
[![npm downloads](https://img.shields.io/npm/dm/emarsys.svg?style=flat-square)](https://npmjs.com/package/emarsys)
[![build status](https://img.shields.io/travis/jhermsmeier/node-emarsys.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-emarsys)

Emarsys API Client

# Install via [npm](https://npmjs.com)

```sh
npm install --save emarsys
```

# Usage

```js
var Emarsys = require( 'emarsys' )

var client = new Emarsys.Client({
  user: 'anonymous',
  secret: '1234567890secret'
})

client.getSettings( function( error, settings ) {
  // ...
})
```

# API

## Emarsys API Documentation

- [Platform Documentation](http://documentation.emarsys.com)
- [API Demo](https://api.emarsys.net/api-demo)

## API Implementation Progress

* [ ] Customers & Administrators
  - [x] Client Settings
  - [x] Delivery Settings
  - [x] Corporate Domains
  - [x] IP Restrictions
  - [x] Security Settings
  - [x] Keyring
  - [ ] Autoimports
  - [ ] Administrators
  - [ ] Interface Languages
  - [ ] Access Levels
* [ ] Contacts
* [ ] Contact Fields
* [ ] Contact Lists
* [ ] Contact Segments
* [ ] Combined Contact Segments
* [ ] Contact Sources
* [ ] Customer Forms
* [ ] Email Campaigns
* [ ] Email Campaign Templates
* [ ] Email Campaign Launches
* [ ] Media Database
* [ ] Conditions
* [ ] Exports
* [ ] External Events
* [ ] Automation Center
* [ ] Carts
* [ ] Omnichannel Campaigns
