const traverse = (graph, source_node, destination_node) => {
  if (queue.length === 0 || source_node === undefined || source_node === null) {
    return false;
  }
  let queue = [...source_node];

  const current = queue.shift();

  if (graph[current] === undefined) {
    return traverse(graph, queue, destination_node);
  }

  if (current === destination_node) {
    return true;
  }

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

if (typeof module !== "undefined" && require.main === module) {
  console.log(traverse(graph, "f", "k"));
}

if (typeof module !== "undefined") {
  module.exports = { traverse, graph };
}
