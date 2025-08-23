// Manual implemettaion of Queue Data Structure

// QUEUE Characteristics
// 1. FIFO (First In First Out) structure
// 2. Elements are added to the back and removed from the front
// 3. Common operations: enqueue (add), dequeue (remove), front (peek), isEmpty (check if empty)

// declared a Queue Function Constructor.
function Queue() {
  let collection = []; // Initialize the collection array

  // you can remove the console.log() on each method. I only added it to log the result on the terminal.

  // will return the current state of the queue.
  this.print = function () {
    console.log(`Queue Items: ${collection}`);
    return collection;
  };

  // will add an item to the end of the queue.
  this.enqueue = function (element) {
    collection.push(element);
    console.log(`Enqueued: ${element}`);
  };

  // will remove an item from the front of the queue.
  this.dequeue = function () {
    let removed = collection.shift();
    console.log(`Dequeued: ${removed}`);
    return removed;
  };

  // will display the first item on the queue.
  this.front = function () {
    console.log(`Front Item: ${collection[0]}`);
    return collection[0];
  };

  // will display the size
  this.size = function () {
    console.log(`Queue Size: ${collection.length}`);
    return collection.length;
  };

  // to check if the queue is empty.
  this.isEmpty = function () {
    console.log(collection.length === 0);
    return collection.length === 0;
  };
}

if (typeof module !== "undefined") {
  module.exports = Queue;
}

if (typeof module !== "undefined" && require.main === module) {
const queue = new Queue();

queue.enqueue("Luderio");
queue.enqueue("Sanchez");
queue.enqueue("New Item");
queue.print();
queue.dequeue();
queue.front();
queue.print();
queue.isEmpty();
}

/**  OUTPUT:
Enqueued: Luderio
Enqueued: Sanchez
Enqueued: New Item
Queue Items: Luderio,Sanchez,New Item
Dequeued: Luderio
Front Item: Sanchez
Queue Items: Sanchez,New Item
false
*/
