const { shortestPath } = require("../graph-shortest-path");

/**
 * Behaviors covered:
 * 1) Returns correct shortest path length in a connected graph with multiple paths (v -> y === 2)
 * 2) Returns -1 when nodes are disconnected (a -> y)
 * 3) Returns 0 when start and end are the same node present in the graph
 * 4) Returns 1 when nodes are directly connected
 * 5) Handles cycles and still returns the correct shortest path length
 * 6) Returns -1 when the start node is not present in the graph
 * 7) Returns -1 for invalid edges input (non-array)
 */

describe("graph-shortest-path shortestPath()", () => {
  test("1) connected graph with multiple paths (v -> y === 2)", () => {
    const edges = [
      ["w", "x"],
      ["x", "y"],
      ["z", "y"],
      ["z", "v"],
      ["w", "v"],
    ];
    expect(shortestPath(edges, "v", "y")).toBe(2);
  });

  test("2) -1 when nodes are disconnected (a -> y)", () => {
    const edges = [
      ["a", "b"],
      ["b", "c"],
      ["x", "y"],
    ];
    expect(shortestPath(edges, "a", "y")).toBe(-1);
  });

  test("3) 0 when start equals end and node exists", () => {
    const edges = [
      ["a", "b"],
      ["b", "c"],
    ];
    expect(shortestPath(edges, "b", "b")).toBe(0);
  });

  test("4) 1 when nodes are directly connected", () => {
    const edges = [["a", "b"]];
    expect(shortestPath(edges, "a", "b")).toBe(1);
  });

  test("5) cycle graph returns correct distance", () => {
    const edges = [
      ["a", "b"],
      ["b", "c"],
      ["c", "d"],
      ["d", "a"], // cycle
    ];
    // a -> c shortest path is 2 (a-b-c or a-d-c)
    expect(shortestPath(edges, "a", "c")).toBe(2);
  });

  test("6) -1 when start node not in graph", () => {
    const edges = [
      ["a", "b"],
      ["b", "c"],
    ];
    expect(shortestPath(edges, "x", "c")).toBe(-1);
  });

  test("7) -1 for invalid edges input", () => {
    expect(shortestPath(null, "a", "b")).toBe(-1);
    expect(shortestPath(undefined, "a", "b")).toBe(-1);
  });
});
