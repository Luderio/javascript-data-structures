const {
  iterativeDFS,
  recursiveDFS,
  iterativeBFS,
  recursiveBFS,
  graph,
} = require("../graph/graph-traversal");

// Silence console logs during tests and capture calls
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
});

beforeEach(() => {
  console.log.mockClear();
});

/**
 * Behaviors covered:
 * 1) iterativeDFS visits nodes in depth-first order: a, c, e, b, d, f
 * 2) recursiveDFS visits nodes in depth-first order: a, c, e, b, d, f
 * 3) iterativeBFS visits nodes in breadth-first order: a, b, c, d, e, f
 * 4) recursiveBFS visits nodes in breadth-first order: a, b, c, d, e, f
 * 5) Starting at a leaf node logs only that node (e)
 * 6) iterative variants throw when starting node is missing from graph
 * 7) recursive variants do not throw when starting node is missing and log only the start node
 * 8) Traversals do not mutate the provided graph object
 */

describe("Graph Traversal", () => {
  test("1) iterativeDFS depth-first order", () => {
    const expected = ["a", "c", "e", "b", "d", "f"];
    iterativeDFS(graph, "a");
    const calls = console.log.mock.calls.map((args) => args[0]);
    expect(calls).toEqual(expected);
  });

  test("2) recursiveDFS depth-first order", () => {
    const expected = ["a", "c", "e", "b", "d", "f"];
    recursiveDFS(graph, "a");
    const calls = console.log.mock.calls.map((args) => args[0]);
    expect(calls).toEqual(expected);
  });

  test("3) iterativeBFS breadth-first order", () => {
    const expected = ["a", "b", "c", "d", "e", "f"];
    iterativeBFS(graph, "a");
    const calls = console.log.mock.calls.map((args) => args[0]);
    expect(calls).toEqual(expected);
  });

  test("4) recursiveBFS breadth-first order", () => {
    const expected = ["a", "b", "c", "d", "e", "f"];
    recursiveBFS(graph, "a");
    const calls = console.log.mock.calls.map((args) => args[0]);
    expect(calls).toEqual(expected);
  });

  test("5) starting at a leaf logs only that node (e)", () => {
    const expected = ["e"];
    iterativeDFS(graph, "e");
    let calls = console.log.mock.calls.map((args) => args[0]);
    expect(calls).toEqual(expected);

    console.log.mockClear();
    recursiveDFS(graph, "e");
    calls = console.log.mock.calls.map((args) => args[0]);
    expect(calls).toEqual(expected);

    console.log.mockClear();
    iterativeBFS(graph, "e");
    calls = console.log.mock.calls.map((args) => args[0]);
    expect(calls).toEqual(expected);

    console.log.mockClear();
    recursiveBFS(graph, "e");
    calls = console.log.mock.calls.map((args) => args[0]);
    expect(calls).toEqual(expected);
  });

  test("6) iterative variants throw when start node missing", () => {
    expect(() => iterativeDFS(graph, "x")).toThrow();
    expect(() => iterativeBFS(graph, "x")).toThrow();
  });

  test("7) recursive variants do not throw when start node missing and log only start", () => {
    expect(() => recursiveDFS(graph, "x")).not.toThrow();
    const callsDFS = console.log.mock.calls.map((args) => args[0]);
    expect(callsDFS).toEqual(["x"]);

    console.log.mockClear();
    expect(() => recursiveBFS(graph, "x")).not.toThrow();
    const callsBFS = console.log.mock.calls.map((args) => args[0]);
    expect(callsBFS).toEqual(["x"]);
  });

  test("8) traversal functions do not mutate the graph object", () => {
    const snapshot = JSON.parse(JSON.stringify(graph));
    iterativeDFS(graph, "a");
    recursiveDFS(graph, "a");
    iterativeBFS(graph, "a");
    recursiveBFS(graph, "a");
    expect(graph).toEqual(snapshot);
  });
});
