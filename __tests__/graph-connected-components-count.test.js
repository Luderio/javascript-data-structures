const {
  graph_island_count,
} = require("../graph/graph-connected-components-count");

/**
 * Behaviors covered:
 * 1) Counts components in a mixed graph with one large component, one pair, and an isolated node (expected: 3)
 * 2) Counts isolated nodes (empty adjacency) as separate components
 * 3) Returns 0 for empty graph or invalid input
 * 4) Handles cycles without infinite loops and returns a single component
 */

describe("graph-connected-components-count", () => {
  test("1) counts components in mixed graph (expected 3)", () => {
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

    expect(graph_island_count(graph)).toBe(3);
  });

  test("2) isolated nodes are separate components", () => {
    const graph = {
      a: [],
      b: [],
      c: [],
    };
    expect(graph_island_count(graph)).toBe(3);
  });

  test("3) empty graph and invalid input return 0", () => {
    const graph = {};
    expect(graph_island_count(graph)).toBe(0);
    expect(graph_island_count(graph)).toBe(0);
    expect(graph_island_count(graph)).toBe(0);
    expect(graph_island_count(graph)).toBe(0);
  });

  test("4) cycles are handled without infinite loops (single component)", () => {
    const graph = {
      a: ["b"],
      b: ["c"],
      c: ["a"], // cycle a-b-c-a
    };
    expect(graph_island_count(graph)).toBe(1);
  });
});
