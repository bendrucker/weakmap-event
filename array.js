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
      if (!arr.getLength()) return
      var diff = data._diff
      diff.forEach(function (change) {
        var index = change[0]
        for (var i = index; i < change.length; i++) {
          if (current[i] !== arr.get(i) && arr.get(i)) {
            listen(arr.get(i), fn)
          }
        }
      })

      current = extend(arr._list)
    }
  }
}
