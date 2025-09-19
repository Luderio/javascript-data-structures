function graph_island_count(graph) {
  let set = new Set();
  let count = 0;

  if (typeof graph !== "object" || Object.keys(graph).length === 0) {
    return 0;
  }

  function traverse(graph, node, set) {
    // checks the input params if they are the right type. returns false if not.
    if (
      node === undefined ||
      typeof set !== "object" ||
      typeof graph !== "object" ||
      Object.keys(graph).length === 0
    ) {
      return false;
    }

    const neighbors = graph[node];

    // if the node is visited already, return false, else add the node to the set.
    if (set.has(String(node))) {
      return false;
    } else {
      set.add(String(node));
    }

    // loops trhough each neighbor and travervse each node.
    while (neighbors.length > 0) {
      const neighbor = neighbors.shift();
      traverse(graph, neighbor, set);
    }
    return true;
  }

  // loop through each node in the graph invoking the traverse function.
  for (let node of Object.keys(graph)) {
    if (traverse(graph, node, set) === true) {
      count++;
    }
  }
  return count;
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

if (typeof module !== "undefined" && require.main === module) {
  const islands = graph_island_count(graph);
  console.log(islands);
}

if (typeof module !== "undefined") {
  module.exports = { graph_island_count };
}
