/**
 * GRAPH: Shortest Path
 *
 * Write a function: shortestPath, that takes in an array of edges for an undireced graph and two nodes (nodeA and nodeB).
 * The function should return the length of the shortest path between nodeA and nodeB.
 * Consider the length as the number of edges in the path, not the number of nodes.
 * If there is no path between nodeA and nodeB, then return -1.
 */

function build_graph(edges) {
  const graph = {};

  edges.forEach((edge) => {
    const [node1, node2] = edge;
    if (!(node1 in graph)) graph[node1] = [];
    if (!(node2 in graph)) graph[node2] = [];
    graph[node1].push(node2);
    graph[node2].push(node1);
  });

  return graph;
}

function isPlainObject(obj) {
  return (
    Object.prototype.toString.call(obj) === "[object Object]" &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

function isSet(set) {
  return (
    Object.prototype.toString.call(set) === "[object Set]" &&
    set.constructor === Set
  );
}

function traverse(graph, nodeA, nodeB, set, edge) {
  if (!isPlainObject(graph) || !isSet(set)) {
    return -1;
  }

  const neighbors = [...nodeA];
  const current_node = neighbors.shift();
  if (set.size === Object.keys(graph).length) {
    return -1;
  }

  if (current_node === nodeB) {
    return edge - 1;
  }

  if (set.has(current_node)) {
    traverse(graph, neighbors, nodeB, set, edge);
  } else {
    set.add(current_node);
    edge += 1;
  }

  return traverse(
    graph,
    [...neighbors, ...graph[current_node]],
    nodeB,
    set,
    edge
  );
}

function shortestPath(edges, nodeA, nodeB) {
  const graph = build_graph(edges);
  let set = new Set();
  let edge = 0;
  return traverse(graph, nodeA, nodeB, set, edge);
}

const edges = [
  ["w", "x"],
  ["x", "y"],
  ["z", "y"],
  ["z", "v"],
  ["w", "v"],
];

const shortest_path = shortestPath(edges, "w", "x");
console.log(shortest_path);
