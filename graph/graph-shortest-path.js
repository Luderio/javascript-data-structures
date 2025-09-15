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

const edges = [
  ["w", "x"],
  ["x", "y"],
  ["z", "y"],
  ["z", "v"],
  ["w", "v"],
];

const graph = build_graph(edges);
console.log(graph);
