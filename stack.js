// Manual Stack Data Structure Implementation in JavaScript

// Stack Characteristics
// 1. LIFO (Last In First Out) structure
// 2. Elements are added to the top and removed from the top
// 3. Common operations: push (add), pop (remove), peek (view top), isEmpty (check if empty)

// created a function constructor named Stack
function Stack() {
  this.count = 0;
  this.storage = {};

  this.push = function (value) {
    this.storage[this.count] = value;
    this.count++;
    console.log(`Pushed: ${value}`);
  };

  this.pop = function () {
    if (this.count === 0) {
      return undefined;
    }

    this.count--;
    let result = this.storage[this.count];
    delete this.storage[this.count];
    return `Popped: ${result}`;
  };

  this.size = function () {
    return `Current size: ${this.count}`;
  };

  this.peek = function () {
    return `Top element: ${this.storage[this.count - 1]}`;
  };

  this.isEmpty = function () {
    return this.count === 0;
  };

  this.clear = function () {
    this.count = 0;
    this.storage = {};
    console.log("Stack cleared");
  };
}

let stack = new Stack();

stack.push("Luderio");
stack.push("Chezzy");
stack.push("New Item");
console.log(stack.size());
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.peek());
console.log(stack.size());
