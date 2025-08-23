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
