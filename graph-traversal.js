const iterativeDFS = (graph, node) => {
  const stack = [node];

  do {
    const current = stack.pop();
    console.log(current);

    graph[current].forEach((item) => {
      stack.push(item);
    });
  } while (stack.length > 0);
};

const recursiveDFS = (graph, node) => {
  const stack = [...node];

  if (stack.length === 0 || stack === undefined) {
    return;
  }

  const current = stack.pop();
  console.log(current);

  if (graph[current] !== undefined) {
    return recursiveDFS(graph, [...stack, ...graph[current]]);
  }
  return recursiveDFS(graph, stack);
};

const iterativeBFS = (graph, node) => {
  const queue = [node];

  do {
    const current = queue.shift();
    console.log(current);
    graph[current].forEach((item) => {
      queue.push(item);
    });
  } while (queue.length > 0);
};

const recursiveBFS = (graph, node) => {
  const queue = [...node];

  if (queue.length === 0 || queue.length === undefined) {
    return;
  }

  const current = queue.shift();
  console.log(current);

  if (graph[current] === undefined) {
    return recursiveBFS(graph, queue);
  }

  return recursiveBFS(graph, [...queue, ...graph[current]]);
};

const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

iterativeDFS(graph, "a");
console.log("------------------------------");
recursiveDFS(graph, "a");
console.log("------------------------------");
iterativeBFS(graph, "a");
console.log("------------------------------");
recursiveBFS(graph, "a");
