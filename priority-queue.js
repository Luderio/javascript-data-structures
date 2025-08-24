// Manual implementation of Priority Queue Data Structure

// Priority Queue Characteristics
// 1. Elements are added with a priority level
// 2. Higher priority elements are dequeued before lower priority ones
// 3. Common operations: enqueue (add), dequeue (remove), front (peek), isEmpty (check if empty)

// declared a PriorityQueue Function Constructor.
function PriorityQueue() {
  let collection = []; // Initialize the collection array

  // will return the current state of the queue.
  this.print = function () {
    return collection;
  };

  // will add an item to the end of the queue.
  this.enqueue = function (element, priority) {
    const timestamp = Date.now(); // will be used as a tie breaker if two items have the same priority.

    if (typeof priority !== "number") {
      console.error("Error: Priority must be a number");
      return;
    }

    collection.push({ element, priority, timestamp });

    collection.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority; // Higher priority first
      }
      return a.timestamp - b.timestamp; // Older timestamp first
    });
  };

  // will remove an item from the front of the queue.
  this.dequeue = function () {
    if (!this.isEmpty()) {
      let removed = collection.shift();
      return `Dequeued: ${removed.element}`;
    }
    console.error("Error: Queue is empty");
    return;
  };

  // will display the first item on the queue.
  this.front = function () {
    if (!this.isEmpty()) {
      return collection[0].element;
    }
    return null;
  };

  // will display the size
  this.size = function () {
    return collection.length;
  };

  // to check if the queue is empty.
  this.isEmpty = function () {
    return collection.length === 0;
  };
}

if (typeof module !== "undefined") {
  module.exports = PriorityQueue;
}

if (typeof module !== "undefined" && require.main === module) {
  const queue = new PriorityQueue();

  queue.enqueue("Luderio", 5);
  queue.enqueue("Sanchez", 4);
  queue.enqueue("New Item", 1);
  queue.enqueue("New Item", 2);
  queue.enqueue("New Item", 1);
  queue.enqueue("New Item", 3);
  queue.enqueue("New Item", 5);

  console.log(queue.print());
  console.log(queue.front());
  console.log(queue.size());
  console.log(queue.isEmpty());

  console.log(queue.dequeue());
  console.log(queue.front());
  console.log(queue.size());
}
