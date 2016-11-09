/** Class representing a priority queue */
class PriorityQueue {
  /**
   * constructor - Create a priority queue
   *
   * @example
   * const queue = new PriorityQueue();
   *
   * @param  {array} [priorities = [1, 2]] An array of priority levels the queue should support from highest to lowest
   */
  constructor(priorities = [1, 2]) {
    this.priorities = priorities;
    this.queue = {};
    this.priorities.forEach(priority => (this.queue[priority] = []));
  }
  /**
   * enqueue - Enqueue a function
   *
   * @example
   * const queue = new PriorityQueue();
   * queue.enqueue(() => 'ayy', 2);
   * // → returns a promise that resolves with 'ayy'
   *
   * @param  {function}   entry                           The function to enqueue
   * @param  {number}     [priority = this.priorities[0]] The priority of the function to enqueue
   * @return {promise}                                    A promise that resolves with enqueued function
   */
  enqueue(entry, priority = this.priorities[0]) {
    const promise = new Promise((resolve) => {
      this.queue[priority].push(() => resolve(entry()));
    });
    return promise;
  }
  /**
   * dequeue - Dequeue the next item in the highest priority queue with items
   *
   * @example
   * const queue = new PriorityQueue();
   * queue.enqueue(() => 'lmao', 2).then(result => console.log(result));
   * queue.dequeue()();
   * // → resolves the promise, logging 'lmao'
   *
   * @return {function}  The dequeued function
   */
  dequeue() {
    let result;
    let index = 0;
    while (!result && index < this.priorities.length) {
      result = this.queue[this.priorities[index]].shift();
      index += 1;
    }
    return result;
  }
}

module.exports = PriorityQueue;
