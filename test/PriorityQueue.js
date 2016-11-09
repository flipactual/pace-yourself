const test = require('ava');
const { PriorityQueue } = require('../PaceYourself');

test('Creates a priority queue', t => {
  t.plan(4);
  const queue = new PriorityQueue();
  t.deepEqual(queue.priorities, [1, 2]);
  t.deepEqual(queue.queue, { 1: [], 2: [] });
  t.is(typeof queue.enqueue, 'function');
  t.is(typeof queue.dequeue, 'function');
});

test('Facilitates arbitrary priorities', t => {
  t.plan(2);
  const queue = new PriorityQueue(['paul', 'blart', 'mall', 'cop']);
  t.deepEqual(queue.priorities, ['paul', 'blart', 'mall', 'cop']);
  t.deepEqual(queue.queue, { paul: [], blart: [], mall: [], cop: [] });
});

test('Enqueues functions without specified priorities', t => {
  t.plan(3);
  const queue = new PriorityQueue();
  queue.enqueue(() => {});
  queue.enqueue(() => {});
  queue.enqueue(() => {});
  t.is(typeof queue.queue[1][0], 'function');
  t.is(typeof queue.queue[1][1], 'function');
  t.is(typeof queue.queue[1][2], 'function');
});

test('Enqueues functions with specified priorities', t => {
  t.plan(3);
  const queue = new PriorityQueue();
  queue.enqueue(() => {}, 2);
  queue.enqueue(() => {}, 1);
  queue.enqueue(() => {}, 2);
  t.is(typeof queue.queue[2][0], 'function');
  t.is(typeof queue.queue[1][0], 'function');
  t.is(typeof queue.queue[2][1], 'function');
});

test.cb('Dequeues functions in order of priority', t => {
  t.plan(2);
  const executed = [];
  const queue = new PriorityQueue([1, 2, 3]);
  queue.enqueue(() => 5, 3).then(result => {
    t.is(result, 5);
    t.deepEqual(executed, [1, 2, 3, 4]);
    t.end();
  });
  queue.enqueue(() => {}, 2).then(() => executed.push(3));
  queue.enqueue(() => {}, 2).then(() => executed.push(4));
  queue.enqueue(() => {}, 1).then(() => executed.push(1));
  queue.enqueue(() => {}, 1).then(() => executed.push(2));
  queue.dequeue()();
  queue.dequeue()();
  queue.dequeue()();
  queue.dequeue()();
  queue.dequeue()();
});
