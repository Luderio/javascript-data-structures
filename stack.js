// Manual Stack Data Structure Implementation in JavaScript

// Stack Characteristics
// 1. LIFO (Last In First Out) structure
// 2. Elements are added to the top and removed from the top
// 3. Items can be of any type (primitive or reference)
// 4. No specific size limit (dynamic sizing)
// 5. Common operations: push (add), pop (remove), peek (view top), isEmpty (check if empty)

// created a function constructor named Stack
function Stack() {
  this.count = 0;
  this.storage = {};

  // adds item on top of the stack.
  this.push = function (value) {
    this.storage[this.count] = value;
    this.count++;
  };

  // removes item from top of the stack.
  this.pop = function () {
    if (this.count === 0) {
      return undefined;
    }

    this.count--;
    delete this.storage[this.count];
  };

  // checks the size/length of the stack.
  this.size = function () {
    return this.count;
  };

  // views the top element of the stack without removing it.
  this.peek = function () {
    return this.storage[this.count - 1];
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
