function graph_island_count(graph, nodes, islands, set) {
  let node = nodes.shift();

  if (graph[node] === undefined || graph[node].length === 0) {
    set.add(node);
    islands.push([node, undefined]);
    return graph_island_count(graph, nodes, islands, set);
  }

  for (let neighbor of graph[node]) {
    if (set.has(neighbor)) {
      islands.forEach((item, index) => {
        if (item[0][1] === Number(node) || item[0][1] === neighbor) {
          item.push([node, neighbor]);
        }
      });

      break;
    } else {
      set.add(Number(node));
      set.add(neighbor);

      islands.push([[node, neighbor]]);
      return graph_island_count(graph, nodes, islands, set);
    }
  }

  if (nodes.length === 0) {
    let count = 0;

    islands.forEach((item) => {
      if (count < item.length) {
        count = item.length;
      }
    });

    console.log("number of Islands: ", islands.length);

    return islands.length;
  }

  return graph_island_count(graph, nodes, islands, set);
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

const nodes = Object.keys(graph);
graph_island_count(graph, nodes, new Array(), new Set());
