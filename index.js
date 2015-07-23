'use strict'

var Event = require('geval/event')
var extend = require('xtend')
var createStore = require('weakmap-shim/create-store')

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

    Object.keys(hash()).forEach(function listenKey (k) {
      listen(hash[k], fn)
    })

    hash(function onChange (newObj) {
      Object.keys(hash()).forEach(function listenKey (k) {
        if (current[k] !== hash[k]) {
          listen(hash[k], fn)
        }
      })

      current = extend(hash)
    })
  }
}
