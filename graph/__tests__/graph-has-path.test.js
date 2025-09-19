const { traverse, graph } = require("../graph-has-path");

/**
 * Behaviors covered:
 * 1) Returns true when a path exists from source to destination (f -> k)
 * 2) Returns false when no path exists from source to destination (k -> f)
 * 3) Returns false when the source is empty or undefined
 * 4) Returns true when source equals destination and node exists
 * 5) Does not mutate the graph object
 * 6) Ignores nodes not present in the graph during traversal
 */

describe("graph-has-path traverse()", () => {
  test("1) true when path exists (f -> k)", () => {
    expect(traverse(graph, "f", "k")).toBe(true);
  });

  test("2) false when no path exists (k -> f)", () => {
    expect(traverse(graph, "k", "f")).toBe(false);
  });

  test("3) false when source is empty or undefined", () => {
    expect(traverse(graph, "", "f")).toBe(false);
    expect(traverse(graph, undefined, "f")).toBe(false);
  });

  test("4) true when source equals destination and node exists", () => {
    expect(traverse(graph, "f", "k")).toBe(true);
    expect(traverse(graph, "j", "h")).toBe(true);
  });

  test("5) does not mutate the graph object", () => {
    const snapshot = JSON.parse(JSON.stringify(graph));
    traverse(graph, "f", "k");
    traverse(graph, "k", "f");
    expect(graph).toEqual(snapshot);
  });

  test("6) ignores nodes not in graph while traversing", () => {
    const g = { ...graph, x: ["y"], y: [] };
    expect(traverse(g, "x", "k")).toBe(false);
    expect(traverse(g, "f", "y")).toBe(false);
  });
});
