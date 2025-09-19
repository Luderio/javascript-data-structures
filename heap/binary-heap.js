// Binary Heap Implementation.

/**
 * HEAP RULES
 * left child: index * 2
 * right child: index * 2 + 1
 * parent: index / 2
 */

/**
 * BINARY HEAP CHARACTERISTICS
 * 1. There are to kinds of binary heaps. Min Heap and Max Heap.
 * 2. Min Heap: child nodes are greater than or equal the parent nodes
 * 3. Max Heap: parent nodes are grater than or equal the child nodes.
 * 4. The order of the nodes does not matter at every level.
 * 5. Binary Heap are also complete binary trees.
 * 6. If the last level is partialy filled, the tree is filled from left to right.
 * 7. Heaps are more often implemented as array.
 */

function Heap() {
  let heap = [null];
  this.output = [];
  let selected_type = "min";

  this.heapify = function (type = "min") {
    type = type.toLowerCase();

    if (typeof type === "string") {
      if (type === "min" || type === "minimum") {
        selected_type = type;
        let parent_index = Math.floor((heap.length - 1) / 2);

        for (let index = parent_index; index >= 1; index--) {
          siftDown(heap, index);
        }

        function siftDown(heap, index) {
          const length = heap.length;
          while (index * 2 < length) {
            let left = index * 2;
            let right = index * 2 + 1;
            let smallest = index;

            if (left < length && heap[left] < heap[smallest]) {
              smallest = left;
            }
            if (right < length && heap[right] < heap[smallest]) {
              smallest = right;
            }

            if (smallest !== index) {
              [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
              index = smallest;
            } else {
              break;
            }
          }
        }

        this.output = heap;
        return this.output;
      } else if (type === "max" || type === "maximum") {
        selected_type = type;
        let parent_index = Math.floor((heap.length - 1) / 2);

        for (let index = parent_index; index >= 1; index--) {
          siftDown(heap, index);
        }

        function siftDown(heap, index) {
          const length = heap.length;
          while (index * 2 < length) {
            let left = index * 2;
            let right = index * 2 + 1;
            let smallest = index;

            if (left < length && heap[left] > heap[smallest]) {
              smallest = left;
            }
            if (right < length && heap[right] > heap[smallest]) {
              smallest = right;
            }

            if (smallest !== index) {
              [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
              index = smallest;
            } else {
              break;
            }
          }
        }

        this.output = heap;
        return this.output;
      } else {
        console.error("Type must be min/minimum or max/maximum");
        return;
      }
    } else {
      console.error("Invalid type. Type must be a type of string");
      return;
    }
  };

  this.insert = function (element) {
    heap.push(element);
  };

  this.peek = function () {
    return this.output[1];
  };

  this.extract = function () {
    let [root] = this.output.splice(1, 1);
    array = [...this.output];
    this.heapify(selected_type);

    return root;
  };

  this.replace = function (value) {
    let [root] = this.output.splice(1, 1, value);
    array = [...this.output];
    this.heapify(selected_type);
    return this.output;
  };
}

if (typeof module !== "undefined") {
  module.exports = Heap;
}
