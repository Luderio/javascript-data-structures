// will traverse/explore the nodess of the tree from starting node to the destination node.
const traverse = (graph, source_node, destination_node) => {
  if (source_node === destination_node) return true;
  if (source_node === undefined || source_node === null) return false;

  let queue = [...source_node];

  if (queue.length === 0 || queue === undefined) return false;

  const current = queue.shift();

  if (graph[current] === undefined) {
    return traverse(graph, queue, destination_node);
  }

  if (current === destination_node) return true;

  return traverse(graph, [...queue, ...graph[current]], destination_node);
};

const graph = {
  f: ["g", "i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: [],
};

// const g = { ...graph, x: ["y"], y: [] };

if (typeof module !== "undefined" && require.main === module) {
  console.log(traverse(graph, "", "k"));
}

if (typeof module !== "undefined") {
  module.exports = { traverse, graph };
}
