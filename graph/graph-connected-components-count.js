function graph_island_count(graph) {
  let set = new Set();
  let count = 0;

  function traverse(graph, node, set) {
    // checks the input params if they are the right type. returns false if not.
    if (node.length === 0 && node === undefined) return false;
    if (typeof graph !== "object") return false;
    if (typeof set !== "object") return false;

    // if the node is visited already, return false, else add the node to the set.
    if (set.has(String(node))) {
      return false;
    }
    set.add(String(node));

    for (let neighbor of graph[node]) {
      traverse(graph, neighbor, set);
    }
    return true;
  }

  for (let node of Object.keys(graph)) {
    if (traverse(graph, node, set) === true) {
      console.log(`returned true, node: ${node}`);
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
