// Manual Stack Data Structure Implementation in JavaScript

// Stack Characteristics
// 1. LIFO (Last In First Out) structure
// 2. Elements are added to the top and removed from the top
// 3. Common operations: push (add), pop (remove), peek (view top), isEmpty (check if empty)

// created a function constructor named Stack
function Stack() {
  this.count = 0;
  this.storage = {};

  // adds item on top of the stack.
  this.push = function (value) {
    this.storage[this.count] = value;
    this.count++;
    console.log(`Pushed: ${value}`);
  };

  // removes item from top of the stack.
  this.pop = function () {
    if (this.count === 0) {
      return undefined;
    }

    this.count--;
    let result = this.storage[this.count];
    delete this.storage[this.count];
    return `Popped: ${result}`;
  };

  // checks the size/length of the stack.
  this.size = function () {
    return `Current size: ${this.count}`;
  };

  // views the top element of the stack without removing it.
  this.peek = function () {
    return `Top element: ${this.storage[this.count - 1]}`;
  };

  // checks if the stack is empty.
  this.isEmpty = function () {
    return this.count === 0;
  };

  // clears the stack.
  this.clear = function () {
    this.count = 0;
    this.storage = {};
    console.log("Stack cleared");
  };
}

// imports the Stack to be used for testing.
if (typeof module !== "undefined") {
  module.exports = Stack;
}

if (typeof module !== "undefined" && require.main === module) {
  const stack = new Stack();

  stack.push("Luderio");
  stack.push("Chezzy");
  stack.push("New Item");
  console.log(stack.size());
  console.log(stack.peek());
  console.log(stack.pop());
  console.log(stack.peek());
  console.log(stack.size());
  console.log(stack.isEmpty());
  stack.clear();
  console.log(stack.size());

  /**
   * OUTPUT:
   * Pushed: Luderio
   * Pushed: Chezzy
   * Pushed: New Item
   * Current size: 3
   * Top element: New Item
   * Popped: New Item
   * Top element: Chezzy
   * Current size: 2
   * false
   * Stack cleared
   * Current size: 0
   */
}
