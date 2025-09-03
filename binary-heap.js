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
  this.array = [null];

  this.heapify = function (type) {
    type = type.toLowerCase();

    if (typeof type === "string") {
      if (type === "min" || type === "minimum") {
        let heap = structuredClone(this.array);
        let parent_index = Math.floor((heap.length - 1) / 2);

        for (let i = parent_index; i >= 1; i--) {
          siftDown(heap, i);
        }

        function siftDown(heap, i) {
          const length = heap.length;
          while (i * 2 < length) {
            let left = i * 2;
            let right = i * 2 + 1;
            let smallest = i;

            if (left < length && heap[left] < heap[smallest]) {
              smallest = left;
            }
            if (right < length && heap[right] < heap[smallest]) {
              smallest = right;
            }

            if (smallest !== i) {
              [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
              i = smallest;
            } else {
              break;
            }
          }
        }

        return heap;
      } else if (type === "max" || type === "maximum") {
        let heap = structuredClone(this.array);
        let parent_index = Math.floor((heap.length - 1) / 2);

        for (let i = parent_index; i >= 1; i--) {
          siftDown(heap, i);
        }

        function siftDown(heap, i) {
          const length = heap.length;
          while (i * 2 < length) {
            let left = i * 2;
            let right = i * 2 + 1;
            let smallest = i;

            if (left < length && heap[left] > heap[smallest]) {
              smallest = left;
            }
            if (right < length && heap[right] > heap[smallest]) {
              smallest = right;
            }

            if (smallest !== i) {
              [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
              i = smallest;
            } else {
              break;
            }
          }
        }

        return heap;
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
    this.array.push(element);
  };
}

if (typeof module !== "undefined") {
  module.exports = Heap;
}
