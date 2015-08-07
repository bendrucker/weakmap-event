'use strict'

var Event = require('geval/event')
var createStore = require('weakmap-shim/create-store')
var extend = require('xtend')
var keyDifference = require('key-difference')

module.exports = WeakmapEvent

function WeakmapEvent () {
  var store = createStore()

  listen.toHash = listenToHash
  listen.toArray = listenToArray

  return {
    broadcast: broadcast,
    listen: listen
  }

  function broadcast (obj, value) {
    if (arguments.length === 1) {
      throw new Error('WeakmapEvent#broadcast expects arguments (obj, value)')
    }
    return getEvent(obj).broadcast(value, obj)
  }

  function listen (obj, fn) {
    if (arguments.length === 1) {
      throw new Error('WeakmapEvent#listen expects arguments (obj, listen)')
    }
    return getEvent(obj).listen(fn)
  }

  function getEvent (obj) {
    var eventStore = store(obj)
    eventStore.event = eventStore.event || Event()
    return eventStore.event
  }

  function listenToArray (arr, fn) {
    throw new Error('Not Implemented.')
  }

  function listenToHash (hash, fn) {
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
