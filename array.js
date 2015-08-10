'use strict'

var extend = require('xtend')

module.exports = function createArrayListener (listen) {
  return function listenToArray (arr, fn) {
    var current = extend(arr._list)

    arr.forEach(function (item) {
      listen(item, fn)
    })
    arr(onChange)

    function onChange (data) {
      var diff = data._diff
      diff.forEach(function (change) {
        var index = change[0]
        if (current[index] !== arr.get(index)) {
          listen(arr.get(index), fn)
        }
      })

      current = extend(arr._list)
    }
  }
}
