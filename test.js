'use strict'

var test = require('tape')
var Hash = require('observ-varhash')
var Observ = require('observ')
var ObservArray = require('observ-array')
var WeakmapEvent = require('./')

test('returns gevental eventent mapped to an object', function (t) {
  t.plan(1)
  var event = WeakmapEvent()
  var obj = {}

  var unlisten = event.listen(obj, function (result) {
    t.equal(result, 'hello')
    unlisten()
  })
  event.broadcast(obj, 'hello')

  // This second broadcast is effectively a noop because of the unlisten
  event.broadcast(obj, 'hello')
})

test('dispatch eventents for an object', function (t) {
  t.plan(2)
  var event = WeakmapEvent()
  var obj = {}
  var obj2 = {}

  event.listen(obj, function (data) {
    t.equal(data, 'hello')
  })
  event.listen(obj2, function (data) {
    t.equal(data, 'goodbye')
  })

  event.broadcast(obj, 'hello')
  event.broadcast(obj2, 'goodbye')
})

test('toHash', function (t) {
  t.plan(3)
  var hash = Hash({
    a: Observ(1),
    b: Observ(2)
  })
  var event = WeakmapEvent()

  event.listen.toHash(hash, function (data) {
    t.equal(data.value, 'foo')
  })

  event.broadcast(hash.a, {
    value: 'foo'
  })
  event.broadcast(hash.b, {
    value: 'foo'
  })

  // now we add a key which should be listened on
  hash.put('c', Observ(3))
  event.broadcast(hash.c, {
    value: 'foo'
  })
})

test('toArray', function (t) {
  t.plan(3)
  var arr = ObservArray([Observ(1)])
  var event = WeakmapEvent()

  event.listen.toArray(arr, function (data) {
    t.equal(data.value, 'foo')
  })

  event.broadcast(arr.get(0), {
    value: 'foo'
  })

  arr.push(Observ(2))
  event.broadcast(arr.get(1), {
    value: 'foo'
  })

  arr.unshift(Observ(0))
  event.broadcast(arr.get(0), {
    value: 'foo'
  })
})

test('argument validation', function (t) {
  var event = WeakmapEvent()
  t.throws(function () {
    event.listen(function listener () {})
  }, 'listen')
  t.throws(function () {
    event.broadcast('value')
  }, 'broadcast')
  t.end()
})
