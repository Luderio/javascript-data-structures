function graph_island_count(graph) {
  let set = new Set();
  let count = 0;

  function traverse(graph, node, set) {
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
    console.log(set);

    if (traverse(graph, node, set) === true) count++;
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
