'use strict'

var Event = require('geval/event')
var createStore = require('weakmap-shim/create-store')
var createHashListener = require('./object')
var createArrayListener = require('./array')

module.exports = WeakmapEvent

function WeakmapEvent () {
  var store = createStore()

  listen.toHash = createHashListener(listen)
  listen.toArray = createArrayListener(listen)

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
}
