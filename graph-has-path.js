const traverse = (graph, source_node, destination_node) => {
  let queue = [...source_node];

  if (queue.length === 0 || queue === undefined) {
    return false;
  }

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

console.log(traverse(graph, "f", "k"));
