const { largest_component, traverse } = require("../graph/graph-largest-component");

/**
 * Behaviors covered:
 * 1) largest_component returns correct largest size for a mixed graph
 * 2) largest_component returns undefined for invalid/empty input
 * 3) traversal does not revisit nodes already in the visited set (no double count)
 * 4) functions do not mutate the input graph object (neighbors arrays)
 * 5) handles cycles without infinite recursion
 */

describe("graph-largest-component", () => {
  test("1) largest_component returns correct largest size for a mixed graph", () => {
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
    // Expected: components are {3} size 1, {4,6,5,7,8} size 5, {1,2} size 2 => largest 5
    expect(largest_component(graph)).toBe(5);
  });

  test("2) largest_component returns undefined for invalid/empty input", () => {
    expect(largest_component({})).toBeUndefined();
    expect(largest_component(undefined)).toBeUndefined();
    expect(largest_component(null)).toBeUndefined();
  });

  test("3) traversal does not revisit nodes already in the visited set (no double count)", () => {
    const graph = {
      a: [b = "b", c = "c"],
      b: ["a"],
      c: ["a"],
    };
    const visited = new Set(["a"]);
    // Starting from an already visited node should contribute 0
    expect(traverse(graph, "a", visited)).toBe(0);
    // Starting from an unvisited neighbor should count that node and avoid re-counting 'a'
    expect(traverse(graph, "b", visited)).toBe(1);
  });

  test("4) functions do not mutate the input graph object (neighbors arrays)", () => {
    const graph = {
      a: ["b", "c"],
      b: ["a"],
      c: ["a"],
    };
    const snapshot = JSON.parse(JSON.stringify(graph));
    const visited = new Set();
    traverse(graph, "a", visited);
    expect(graph).toEqual(snapshot);
  });

  test("5) handles cycles without infinite recursion", () => {
    const graph = {
      a: ["b"],
      b: ["c"],
      c: ["a"], // cycle a->b->c->a
    };
    const visited = new Set();
    expect(traverse(graph, "a", visited)).toBe(3);
    // running again from a visited node yields 0, confirming visited-set works
    expect(traverse(graph, "a", visited)).toBe(0);
  });
});
