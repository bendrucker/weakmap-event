'use strict'

var Event = require('geval/event')
var createStore = require('weakmap-shim/create-store')
var extend = require('xtend')

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

    forEach(hash, listenKey)
    hash(onChange)

    function listenKey (key) {
      listen(hash[key], fn)
    }

    function onChange () {
      forEach(hash, function (key) {
        if (current[key] !== hash[key]) {
          listen(hash[key], fn)
        }
      })

      current = extend(hash)
    }
  }
}

function forEach (observable, callback) {
  return Object.keys(observable()).forEach(callback)
}
