function Queue() {
  collection = [];

  this.print = function () {
    console.log(`Queue Items: ${collection}`);
    return collection;
  };

  this.enqueue = function (element) {
    collection.push(element);
    console.log(`Enqueued: ${element}`);
  };

  this.dequeue = function () {
    let removed = collection.shift();
    console.log(`Dequeued: ${removed}`);
    return removed;
  };

  this.front = function () {
    console.log(`Front Item: ${collection[0]}`);
    return collection[0];
  };

  this.size = function () {
    console.log(`Queue Size: ${collection.length}`);
    return collection.length;
  };

  this.isEmpty = function () {
    console.log(collection.length === 0);
    return collection.length === 0;
  };
}

var queue = new Queue();

queue.enqueue("Luderio");
queue.enqueue("Sanchez");
queue.enqueue("New Item");
queue.print();
queue.dequeue();
queue.front();
queue.print();
