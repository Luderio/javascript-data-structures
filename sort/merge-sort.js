/**
 * Merge Sort
 *
 */

function merge(left, right) {
  const out = [];

  while (left.length && right.length) {
    out.push(left[0] < right[0] ? left.shift() : right.shift());
  }

  while (left.length) {
    out.push(left.shift());
  }

  while (right.length) {
    out.push(right.shift());
  }

  return out;
}
function mergeSort(data) {
  if (data.length < 2) return data;

  const mid_point = Math.round(data.length / 2);
  const left = mergeSort(data.slice(0, mid_point));
  const right = mergeSort(data.slice(mid_point));

  return merge(left, right);
}

const unsorted_array = [7, 4, 6, 5, 2, 9, 3, 8, 1];
console.log(mergeSort(unsorted_array));
