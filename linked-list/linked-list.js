// Linked List

// This is my own implementation of a Linked list in JavaScript

function LinkedList() {
  this.length = 0;
  let head = null;

  // constructor function to create nodes.
  function Node(element) {
    this.element = element;
    this.next = null;
  }

  // returns the current head node.
  this.head = function () {
    if (head === null) {
      console.info("The linked list has no existing nodes yet.");
      return null;
    }
    return head;
  };

  // checks if the linked list has value
  this.isEmpty = function () {
    return head === null;
  };

  // adds a new data to the end of the linked list
  this.insert = function (element) {
    let node = new Node(element);

    if (head === null) {
      head = node;
      this.length++;
      return;
    } else {
      let current_node = head;
      while (current_node.next !== null) {
        current_node = current_node.next;
      }
      current_node.next = node;
      this.length++;
      return;
    }
  };

  // searches for an element in he linked list.
  this.search = function (element) {
    if (head === null) {
      console.info("The linked list has no existing nodes yet.");
      return null;
    }
    if (head.element === element) {
      return head;
    } else {
      let current_node = head;
      while (current_node.element !== element && current_node.next !== null) {
        current_node = current_node.next;
      }

      if (current_node.next === null && current_node.element !== element) {
        console.info("Element is not existing in the list");
        return null;
      } else {
        return current_node;
      }
    }
  };

  this.delete = function (element) {
    if (head === null) {
      console.info("The linked list has no existing nodes yet.");
      return null;
    }

    let node = this.search(element);
    if (node === null) {
      return null;
    }

    if (head.element === element) {
      head = head.next;
      this.length--;
      return;
    } else {
      let current_node = head;
      let previous_node;
      while (current_node.element !== element) {
        previous_node = current_node;
        current_node = current_node.next;
      }
      previous_node.next = current_node.next;
      this.length--;
    }
  };

  this.indexOf = function (element) {
    if (head === null) {
      return -1;
    }

    let index = 0;
    if (head.element === element) {
      return index;
    } else {
      let current_node = head;
      while (current_node.element !== element && current_node.next !== null) {
        current_node = current_node.next;
        index++;
      }

      if (current_node.next === null && current_node.element !== element) {
        return -1;
      } else {
        return index;
      }
    }
  };

  this.elementAt = function (index) {
    if (head === null) {
      console.info("The linked list has no existing nodes yet.");
      return null;
    }

    if (index > this.length - 1 || index < 0) {
      console.info(
        `Index must not be a negative number and not larger than ${
          this.length - 1
        }`
      );
      return -1;
    }

    if (index === 0) {
      return head.element;
    } else {
      let node = head;
      let item = 0;
      while (item < index) {
        item++;
        node = node.next;
      }
      return node.element;
    }
  };

  this.insertAt = function (index, element) {
    let new_node = new Node(element);

    if (head === null && index > 0) {
      console.info("The linked list has no existing nodes yet.");
      return null;
    } else if (head === null && index === 0) {
      head = new_node;
      this.length++;
    } else if (index < 0 || index > this.length) {
      console.info(
        `Index must not be a negative number and not larger than ${
          this.length - 1
        } + 1`
      );
      return null;
    } else if (head !== null && index === 0) {
      new_node.next = head;
      head = new_node;
      this.length++;
    } else if (index > this.length - 1 && index === this.length) {
      this.insert(element);
    } else {
      let current_node = head;
      let previous_node;
      let item = 0;
      while (item < index) {
        previous_node = current_node;
        current_node = current_node.next;
        item++;
      }
      new_node.next = current_node;
      previous_node.next = new_node;
      this.length++;
    }
  };

  this.deleteAt = function (index) {
    if (head === null) {
      console.info("The linked list has no existing nodes yet.");
      return null;
    } else if (index < 0 || index >= this.length) {
      console.info(
        `Index must not be a negative number and not larger than ${
          this.length - 1
        }`
      );
      return null;
    } else if (index === 0) {
      head = head.next;
      this.length--;
    } else {
      let current_node = head;
      let previous_node;
      let item = 0;
      while (item < index) {
        previous_node = current_node;
        current_node = current_node.next;
        item++;
      }
      previous_node.next = current_node.next;
      this.length--;
    }
  };

  this.traverse = function (callback) {
    if (head === null) {
      return;
    }

    let node = head;

    while (node) {
      callback(node.element);
      node = node.next;
    }
  };
}

if (typeof module !== "undefined") {
  module.exports = LinkedList;
}
