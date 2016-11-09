const test = require('ava');
const { QueueConsumer, PriorityQueue } = require('../PaceYourself');

test('Creates a queue consumer', t => {
  t.plan(4);
  const queue = new PriorityQueue();
  const consumer = new QueueConsumer(queue);
  t.deepEqual(consumer.queue, { priorities: [1, 2], queue: { 1: [], 2: [] } });
  t.is(consumer.delay, 2500);
  t.is(typeof consumer.start, 'function');
  t.is(typeof consumer.stop, 'function');
});

test('Facilitates arbitrary delays', t => {
  t.plan(1);
  const queue = new PriorityQueue();
  const consumer = new QueueConsumer(queue, 86400000);
  t.is(consumer.delay, 86400000);
});

test.cb('Starts consuming a queue', t => {
  t.plan(1);
  const executed = [];
  const queue = new PriorityQueue();
  const consumer = new QueueConsumer(queue, 250);
  queue.enqueue(() => executed.push(1));
  queue.enqueue(() => executed.push(2));
  queue.enqueue(() => executed.push(3));
  consumer.start();
  setTimeout(() => {
    t.deepEqual(executed, [1, 2, 3]);
    t.end();
  }, 1000);
});

test.cb('Stops consuming a queue', t => {
  t.plan(2);
  const executed = [];
  const queue = new PriorityQueue();
  const consumer = new QueueConsumer(queue);
  queue.enqueue(() => executed.push(1));
  queue.enqueue(() => executed.push(2));
  queue.enqueue(() => executed.push(3));
  consumer.start();
  setTimeout(() => {
    consumer.stop();
    t.deepEqual(executed, [1]);
    t.deepEqual(queue.queue[1].length, 2);
    t.end();
  }, 3000);
});
