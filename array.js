'use strict'

module.exports = function createArrayListener (listen) {
  return function listenToArray (arr, fn) {
    arr.forEach(function (item) {
      listen(item, fn)
    })
  }
}
