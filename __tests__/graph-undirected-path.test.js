const { undirected_graph } = require("../graph/graph-undirected-path");

/**
 * Behaviors covered:
 * 1) Returns true when a path exists between connected nodes (i -> m)
 * 2) Returns false when nodes are in different disconnected components (i -> n)
 * 3) Returns false when the start node is not present in the graph (x -> i)
 * 4) Returns true when source equals destination (k -> k)
 * 5) Handles cycles without infinite recursion and finds a valid path (a -> c)
 */

describe("graph-undirected-path undirected_graph()", () => {
  test("1) true when path exists between connected nodes (i -> m)", () => {
    const edges = [
      ["i", "j"],
      ["k", "i"],
      ["m", "k"],
      ["k", "l"],
      ["o", "n"],
    ];

    expect(undirected_graph(edges, "i", "m")).toBe(true);
  });

  test("2) false when nodes are in different components (i -> n)", () => {
    const edges = [
      ["i", "j"],
      ["k", "i"],
      ["m", "k"],
      ["k", "l"],
      ["o", "n"],
    ];

    expect(undirected_graph(edges, "i", "n")).toBe(false);
  });

  test("3) false when start node is not present in graph (x -> i)", () => {
    const edges = [
      ["i", "j"],
      ["k", "i"],
      ["m", "k"],
      ["k", "l"],
      ["o", "n"],
    ];

    expect(undirected_graph(edges, "x", "i")).toBe(false);
  });

  test("4) true when source equals destination (k -> k)", () => {
    const edges = [
      ["i", "j"],
      ["k", "i"],
      ["m", "k"],
      ["k", "l"],
      ["o", "n"],
    ];

    expect(undirected_graph(edges, "k", "k")).toBe(true);
  });

  test("5) handles cycles without infinite recursion (a -> c)", () => {
    const edges = [
      ["a", "b"],
      ["b", "c"],
      ["c", "a"], // cycle a-b-c-a
    ];

    expect(undirected_graph(edges, "a", "c")).toBe(true);
  });
});
