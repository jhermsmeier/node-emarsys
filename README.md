# Emarsys
[![npm](https://img.shields.io/npm/v/emarsys.svg?style=flat-square)](https://npmjs.com/package/emarsys)
[![npm license](https://img.shields.io/npm/l/emarsys.svg?style=flat-square)](https://npmjs.com/package/emarsys)
[![npm downloads](https://img.shields.io/npm/dm/emarsys.svg?style=flat-square)](https://npmjs.com/package/emarsys)
[![build status](https://img.shields.io/travis/jhermsmeier/node-emarsys.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-emarsys)

Emarsys API Client

## Install via [npm](https://npmjs.com)

```sh
npm install --save emarsys
```

## Usage

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
