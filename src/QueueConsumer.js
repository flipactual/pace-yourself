/** Class representing a queue consumer */
class QueueConsumer {
  /**
   * constructor - Create a queue consumer
   *
   * @example
   * const queue = new PriorityQueue();
   * const consumer = new QueueConsumer(queue, 86400000);
   *
   * @param  {PriorityQueue}   queue          The queue to consume
   * @param  {number}          [delay = 2500] The interval, in ms, to wait between dequeueing functions
   */
  constructor(queue, delay = 2500) {
    this.queue = queue;
    this.delay = delay;
  }
  /**
   * start - Start consuming the queue
   */
  start() {
    this.interval = setInterval(() => {
      const next = this.queue.dequeue();
      if (next) {
        next();
      }
    }, this.delay);
  }
  /**
   * stop - Stop consuming the queue
   */
  stop() {
    clearInterval(this.interval);
  }
}

module.exports = QueueConsumer;
