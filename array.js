'use strict'

module.exports = function createArrayListener (listen) {
  return function listenToArray (arr, fn) {
    arr.forEach(function (item) {
      listen(item, fn)
    })
    arr(onChange)

    function onChange (data) {
      var diff = data._diff
      diff.forEach(function (change) {
        var index = change[0]
        listen(arr.get(index), fn)
      })
    }
  }
}
