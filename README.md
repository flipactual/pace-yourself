# pace-yourself

[![flipactual](https://img.shields.io/badge/😋-flipactual-218AC7.svg?style=flat-square)](https://www.flipactual.com/)
[![Travis](https://img.shields.io/travis/flipactual/pace-yourself.svg?style=flat-square)](https://travis-ci.org/flipactual/pace-yourself/)
[![Codecov](https://img.shields.io/codecov/c/github/flipactual/pace-yourself.svg?style=flat-square)](https://codecov.io/gh/flipactual/pace-yourself/)
[![Node](https://img.shields.io/node/v/pace-yourself.svg?style=flat-square)](http://npmjs.com/package/pace-yourself)
[![NPM](https://img.shields.io/npm/v/pace-yourself.svg?style=flat-square)](http://npmjs.com/package/pace-yourself)

A priority queue and consumer

<a name="PriorityQueue"></a>

## PriorityQueue
Class representing a priority queue

**Kind**: global class  

* [PriorityQueue](#PriorityQueue)
    * [new PriorityQueue([priorities])](#new_PriorityQueue_new)
    * [.enqueue(entry, [priority])](#PriorityQueue+enqueue) ⇒ <code>promise</code>
    * [.dequeue()](#PriorityQueue+dequeue) ⇒ <code>function</code>

<a name="new_PriorityQueue_new"></a>

### new PriorityQueue([priorities])
constructor - Create a priority queue


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [priorities] | <code>array</code> | <code>[1, 2]</code> | An array of priority levels the queue should support from highest to lowest |

**Example**  
```js
const queue = new PriorityQueue();
```
<a name="PriorityQueue+enqueue"></a>

### priorityQueue.enqueue(entry, [priority]) ⇒ <code>promise</code>
enqueue - Enqueue a function

**Kind**: instance method of <code>[PriorityQueue](#PriorityQueue)</code>  
**Returns**: <code>promise</code> - A promise that resolves with enqueued function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| entry | <code>function</code> |  | The function to enqueue |
| [priority] | <code>number</code> | <code>this.priorities[0]</code> | The priority of the function to enqueue |

**Example**  
```js
const queue = new PriorityQueue();
queue.enqueue(() => 'ayy', 2);
// → returns a promise that resolves with 'ayy'
```
<a name="PriorityQueue+dequeue"></a>

### priorityQueue.dequeue() ⇒ <code>function</code>
dequeue - Dequeue the next item in the highest priority queue with items

**Kind**: instance method of <code>[PriorityQueue](#PriorityQueue)</code>  
**Returns**: <code>function</code> - The dequeued function  
**Example**  
```js
const queue = new PriorityQueue();
queue.enqueue(() => 'lmao', 2).then(result => console.log(result));
queue.dequeue()();
// → resolves the promise, logging 'lmao'
```

<a name="QueueConsumer"></a>

## QueueConsumer
Class representing a queue consumer

**Kind**: global class  

* [QueueConsumer](#QueueConsumer)
    * [new QueueConsumer(queue, [delay])](#new_QueueConsumer_new)
    * [.start()](#QueueConsumer+start)
    * [.stop()](#QueueConsumer+stop)

<a name="new_QueueConsumer_new"></a>

### new QueueConsumer(queue, [delay])
constructor - Create a queue consumer


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| queue | <code>PriorityQueue</code> |  | The queue to consume |
| [delay] | <code>number</code> | <code>2500</code> | The interval, in ms, to wait between dequeueing functions |

**Example**  
```js
const queue = new PriorityQueue();
const consumer = new QueueConsumer(queue, 86400000);
```
<a name="QueueConsumer+start"></a>

### queueConsumer.start()
start - Start consuming the queue

**Kind**: instance method of <code>[QueueConsumer](#QueueConsumer)</code>  
<a name="QueueConsumer+stop"></a>

### queueConsumer.stop()
stop - Stop consuming the queue

**Kind**: instance method of <code>[QueueConsumer](#QueueConsumer)</code>  

## Scripts

### `test` – run the tests

```sh
npm run test
```

### `coverage` – generate and view code coverage as HTML

```sh
npm run coverage
```

### `lint` – lint the codebase

```sh
npm run lint
```

### `readme` – generate the README

```sh
npm run readme
```

## License

MIT @ [Flip](https://github.com/flipactual)
