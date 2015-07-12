'use strict'

var test = require('tape')
var WeakmapEvent = require('./')

test('it returns a geval event associated with an object', function (t) {
  t.plan(1)
  var ev = WeakmapEvent()
  var obj = {}

  var unlisten = ev.listen(obj, function (result) {
    t.equal(result, 'hello')
    unlisten()
  })
  ev.broadcast(obj, 'hello')

  // This second broadcast is effectively a noop because of the unlisten
  ev.broadcast(obj, 'hello')
})

test('it throws if one argument passed to listen or broadcast', function (t) {
  t.plan(2)
  var ev = WeakmapEvent()
  t.throws(function () {
    ev.listen(function listener () {})
  })
  t.throws(function () {
    ev.broadcast('value')
  })
})

test('it should only listen and broadcast to a store on the same object', function (t) {
  t.plan(2)
  var ev = WeakmapEvent()
  var obj = {}
  var obj2 = {}

  ev.listen(obj, function (data) {
    t.equal(data, 'hello')
  })
  ev.listen(obj2, function (data) {
    t.equal(data, 'goodbye')
  })

  ev.broadcast(obj, 'hello')
  ev.broadcast(obj2, 'goodbye')
})

test('it should work with multiple listeners associated with the same object', function (t) {
  t.plan(2)
  var ev = WeakmapEvent()
  var obj = {}

  ev.listen(obj, function (data) {
    t.equal(data, 'double')
  })
  ev.listen(obj, function (data) {
    t.equal(data, 'double')
  })

  ev.broadcast(obj, 'double')
})
