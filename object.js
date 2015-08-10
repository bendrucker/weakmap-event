'use strict'

var extend = require('xtend')
var keyDifference = require('key-difference')

module.exports = function createHashListener (listen) {
  return function listenToHash (hash, fn) {
    var current = extend(hash)
    var unlisteners = {}

    forEach(hash, listenKey)
    hash(onChange)

    return unlisten

    function listenKey (key) {
      unlisteners[key] = listen(hash[key], fn)
    }

    function unlistenKey (key) {
      unlisteners[key]()
    }

    function onChange () {
      keyDifference(current, hash()).forEach(unlistenKey)
      forEach(hash, function (key) {
        if (current[key] !== hash[key]) {
          if (current[key]) unlistenKey(key)
          listenKey(key)
        }
      })

      current = extend(hash)
    }

    function unlisten () {
      for (var key in unlisteners) {
        unlisteners[key]()
      }
      unlisteners = {}
    }
  }
}

function forEach (observable, callback) {
  return Object.keys(observable()).forEach(callback)
}
