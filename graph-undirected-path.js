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

    const stack = [...source_node];

    if (stack.length === 0 || stack === undefined) {
      return;
    }

    let current = stack.pop();

    // if (set.has(current)) return false;
    if (set.has(current)) {
      current = stack.pop();
      return traverse(graph, [current, ...stack], destination_node, set);
    }
    set.add(current);

    if (graph[current] === undefined) {
      return traverse(graph, stack, destination_node, set);
    }

    if (current === destination_node) {
      return true;
    }

    return traverse(
      graph,
      [...stack, ...graph[current]],
      destination_node,
      set
    );
  };

  const graph = build_graph(edges);
  return traverse(graph, node_a, node_b, new Set());
};

const edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];

console.log(undirected_graph(edges, "p", "i"));
