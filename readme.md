# weakmap-event

> Associate [geval](https://github.com/Raynos/geval) events with a given object.

Adapted from code in [Mercury](https://github.com/Raynos/mercury)'s examples.


## Install

```
$ npm install --save weakmap-event
```


## Usage

```js
var WeakmapEvent = require('weakmap-event')

var onClick = WeakmapEvent()

var obj1 = {}
var obj2 = {}

onClick.listen(obj1, function(data) {
  assert.equal(data, 'hello')
})
onClick.listen(obj2, function(data) {
  assert.equal(data, 'goodbye')
})

onClick.broadcast(obj1, 'hello')
onClick.broadcast(obj2, 'goodbye')
```

## API

#### `WeakmapEvent()` -> `{ listen: Function(obj, listener), broadcast: Function(obj, value) }`

## License

MIT © [Jake Verbaten](http://github.com/Raynos)
