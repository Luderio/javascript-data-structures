/**
 * Graph: Island Count
 *
 * Write a function islandCount(), that takes in a grid containing Ws and Ls. W represents water and L represents land.
 * The function should return the number of islands on the grid.
 * An island is a vertically or horizontally connected region of the land.
 */

const build_graph = (grid) => {
  const graph = {};

  grid.forEach((edge) => {
    const [node1, node2, node3, node4, node5] = edge;
    if (!(node1 in graph)) graph[node1] = [];
    if (!(node2 in graph)) graph[node2] = [];
    if (!(node3 in graph)) graph[node3] = [];
    if (!(node4 in graph)) graph[node4] = [];
    if (!(node5 in graph)) graph[node5] = [];
    graph[node1].push([node1, node2, node3, node4, node5]);
    graph[node2].push([node1, node2, node3, node4, node5]);
    graph[node3].push([node1, node2, node3, node4, node5]);
    graph[node4].push([node1, node2, node3, node4, node5]);
    graph[node5].push([node1, node2, node3, node4, node5]);
  });

  return graph;
};

const grid = [
  ["W", "L", "W", "W", "W"],
  ["W", "L", "W", "w", "w"],
  ["W", "w", "W", "L", "W"],
  ["W", "W", "L", "L", "W"],
  ["L", "W", "W", "L", "L"],
  ["L", "L", "W", "W", "W"],
];

console.log(build_graph(grid));
