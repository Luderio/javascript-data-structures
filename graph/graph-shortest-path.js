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

function traverse(graph, nodeA, nodeB, set, distance) {
  if (!isPlainObject(graph) || !isSet(set)) {
    return -1;
  }

  // When all nodes have been visited without finding nodeB
  const neighbors = Array.isArray(nodeA) ? [...nodeA] : [nodeA];
  const current_node = neighbors.shift();

  if (current_node === undefined) {
    return -1;
  }

  if (current_node === nodeB) {
    return Math.ceil(distance / 2); // formula on computing the edges not nodes.
  }

  if (set.has(current_node)) {
    return traverse(graph, neighbors, nodeB, set, distance);
  } else {
    set.add(current_node);
    distance += 1;
  }

  const nextNeighbors = graph[current_node] || []; // handles case where current_node has no neighbors.
  return traverse(
    graph,
    [...neighbors, ...nextNeighbors],
    nodeB,
    set,
    distance
  );
}

function shortestPath(edges, nodeA, nodeB) {
  if (!Array.isArray(edges)) return -1;
  const graph = build_graph(edges);
  const set = new Set();
  let distance = 0;
  return traverse(graph, nodeA, nodeB, set, distance);
}

// Example manual run when executing this file directly
if (typeof module !== "undefined" && require.main === module) {
  const edges = [
    ["w", "x"],
    ["x", "y"],
    ["z", "y"],
    ["z", "v"],
    ["w", "v"],
  ];

  const shortest_path = shortestPath(edges, "v", "y");
  console.log(shortest_path);
}

if (typeof module !== "undefined") {
  module.exports = { shortestPath, traverse };
}
