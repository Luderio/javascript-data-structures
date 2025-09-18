/**
 * Bubble sort
 *
 * Implementation of Bubble SOrt Algorithm to sort an unsorted list.
 */
function bubbleSort(data) {
  let len = data.length;

  do {
    for (let i = 0; i < len - 1; i++) {
      if (data[i] > data[i + 1]) {
        [([data[i], data[i + 1]] = [data[i + 1], data[i]])]; // swaps the value.
      }
    }
  } while (len--);

  return data;
}

const unsorted_list = [7, 4, 6, 5, 2, 9, 3, 8, 1];
console.log(bubbleSort(unsorted_list));
