/**
 * Quick Sort
 *
 * Implementation of a Quick Sort Algorithm to sort an unsorted list.
 */

function quickSort(data) {
  if (data.length < 1) return [];
  let left = [];
  let right = [];
  let pivot = data[0];

  for (let i = 1; i < data.length; i++) {
    if (data[i] < pivot) {
      left.push(data[i]);
    } else {
      right.push(data[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const unsorted_array = [7, 4, 6, 5, 2, 9, 3, 8, 1];
console.log(quickSort(unsorted_array));
