'use strict'

module.exports = function createArrayListener (listen) {
  return function listenToArray (arr, fn) {
    var current = arr._list.slice()

    arr.forEach(function (item) {
      listen(item, fn)
    })
    arr(onChange)

    function onChange (data) {
      var diff = data._diff
      diff.forEach(function (change) {
        var index = change[0]
        var remove = change[1]
        for (var i = index + remove; i < change.length; i++) {
          if (current[i] !== arr.get(i)) {
            listen(arr.get(i), fn)
          }
        }
      })

      current = arr._list.slice()
    }
  }
}
