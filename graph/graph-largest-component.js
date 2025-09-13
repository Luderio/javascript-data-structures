function traverse(graph, node, set) {
  if (
    node === undefined ||
    typeof set !== "object" ||
    typeof graph !== "object" ||
    Object.keys(graph).length === 0
  ) {
    return 0;
  }

  if (set.has(String(node))) {
    return false;
  } else {
    set.add(String(node));
  }

  const neighbors = graph[node];
  let size = 1;

  while (neighbors.length > 0) {
    const current = neighbors.pop();
    size += traverse(graph, current, set);
  }

  return size;
}

function largest_component(graph) {
  if (typeof graph !== "object" || Object.keys(graph).length === 0) {
    return;
  }
  let set = new Set();
  let largest = 0;

  for (let node of Object.keys(graph)) {
    let size = traverse(graph, node, set);
    if (size > largest) largest = size;
  }
  return largest;
}

const graph = {
  3: [],
  4: [6],
  6: [4, 5, 7, 8],
  8: [6],
  7: [6],
  5: [6],
  1: [2],
  2: [1],
};

const largest_island = largest_component(graph);
console.log(largest_island);
