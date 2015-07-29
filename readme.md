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

#### `WeakmapEvent()` -> `event`

Creates a new weak-mapped event interface.

#### `event.broadcast(obj, value)` -> `undefined`

Broadcasts the value for listeners mapped to the object

##### obj

*Required*  
Type: `object`

The object to limit the broadcast to. Listeners on other objects will not be called.

##### value

*Required*  
Type: `any`

The value to broadcast to matched listeners.

#### `event.listen(obj, listener)` -> `function`

Listen on values emitted for a given object. Returns an `unlisten` function that will disable the listener when called.

##### obj

*Required*  
Type: `object`

The object to listen on.

##### listener

*Required*  
Type: `function`  
Arguments: `value`

A listener function to be called when a value is broadcasted matching the object.


## License

MIT © [Eaze Solutions](http://eazeup.com)
