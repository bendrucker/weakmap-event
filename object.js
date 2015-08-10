'use strict'

var extend = require('xtend')

module.exports = function createHashListener (listen) {
  return function listenToHash (hash, fn) {
    var current = extend(hash)

    forEach(hash, listenKey)
    hash(onChange)

    function listenKey (key) {
      listen(hash[key], fn)
    }

    function onChange () {
      forEach(hash, function (key) {
        if (current[key] !== hash[key]) {
          listenKey(key)
        }
      })

      current = extend(hash)
    }
  }
}

function forEach (observable, callback) {
  return Object.keys(observable()).forEach(callback)
}
