function graph_island_count(graph) {
  let set = new Set();
  let count = 0;

  function traverse(graph, node, set) {
    if (node.length === 0 && node === undefined) return false;
    if (typeof graph !== "object") return false;
    if (typeof set !== "object") return false;

    const stack = [...node];

    if (stack.length === 0 || stack === undefined) return true;

    const current = stack.pop();

    if (set.has(String(current))) {
      return false;
    }
    set.add(String(current));

    if (graph[current] === undefined || graph[current].length === 0) {
      return true;
    }

    traverse(graph, [...stack, ...graph[current]], set);

    // return true;
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
