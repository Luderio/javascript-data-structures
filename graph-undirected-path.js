const edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];

const undirected_graph = (edges, node_a, node_b) => {
  const build_graph = (edges) => {
    const graph = {};

    for (let edge of edges) {
      const [node1, node2] = edge;
      if (!(node1 in graph)) graph[node1] = [];
      if (!(node2 in graph)) graph[node2] = [];
      graph[node1].push(node2);
      graph[node2].push(node1);
    }

    return graph;
  };

  const traverse = (graph, source_node, destination_node, set) => {
    if (source_node === destination_node) return true;
    if (
      source_node.length === 0 ||
      source_node === undefined ||
      source_node === null
    ) {
      return false;
    }
    if (set.has(source_node)) return false;
    set.add(source_node);

    for (let neighbor of graph[source_node]) {
      if (traverse(graph, neighbor, destination_node, set) === true)
        return true;
    }
    return false;
  };

  const graph = build_graph(edges);
  return traverse(graph, node_a, node_b, new Set());
};

console.log(undirected_graph(edges, "l", "m"));
