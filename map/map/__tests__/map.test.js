const CustomMap = require("../map");

// Silence console warnings during tests but keep ability to assert calls
beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterAll(() => {
  console.warn.mockRestore();
});

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Behaviors covered:
 * 1) New map initial state: size() = 0, keys() = [], values() = [], entries() = null, get() returns null for missing key, has() returns false
 * 2) set() stores/updates values; size() increments on every set() call (including updates)
 * 3) delete() removes existing keys and decrements size; deleting non-existent key leaves size unchanged
 * 4) entries() returns [value, key] tuples in insertion order when non-empty
 * 5) forEach() iterates entries and passes (value, key, map) to callback
 * 6) clear() resets collection and size, and returns null
 * 7) forEach() on empty map logs a warning and ignores the call
 */

describe("CustomMap", () => {
  test("1) New map initial state: size 0; keys [], values [], entries null; get/has for missing key", () => {
    const m = new CustomMap();
    expect(m.size()).toBe(0);
    expect(m.keys()).toEqual([]);
    expect(m.values()).toEqual([]);
    expect(m.entries()).toBeNull();
    expect(m.get("missing")).toBeNull();
    expect(m.has("missing")).toBe(false);
  });

  test("2) set() stores values and increments size even when updating existing keys", () => {
    const m = new CustomMap();

    m.set("a", 1);
    m.set("b", 2);
    expect(m.size()).toBe(2);
    expect(m.get("a")).toBe(1);
    expect(m.get("b")).toBe(2);

    // update existing key
    m.set("a", 3);
    expect(m.get("a")).toBe(3);

    // Note: implementation increments count on every set(), even on updates
    expect(m.size()).toBe(3);

    // Keys reflect actual distinct keys present
    expect(m.keys().sort()).toEqual(["a", "b"].sort());
  });

  test("3) delete() removes existing keys and decrements size; deleting non-existent does not change size", () => {
    const m = new CustomMap();

    m.set("a", 1);
    m.set("b", 2);
    m.set("a", 3); // size becomes 3 per implementation
    expect(m.size()).toBe(3);

    m.delete("a");
    expect(m.has("a")).toBe(false);
    expect(m.get("a")).toBeNull();
    expect(m.size()).toBe(2);

    // deleting non-existent key leaves size unchanged
    m.delete("does-not-exist");
    expect(m.size()).toBe(2);
  });

  test("4) entries() returns [value, key] pairs in insertion order when non-empty", () => {
    const m = new CustomMap();
    m.set("x", 10);
    m.set("y", 20);

    const e = m.entries();
    expect(Array.isArray(e)).toBe(true);
    expect(e).toEqual([
      [10, "x"],
      [20, "y"],
    ]);
  });

  test("5) forEach() iterates over entries and passes (value, key, map)", () => {
    const m = new CustomMap();
    m.set("k1", "v1");
    m.set("k2", "v2");

    const calls = [];
    m.forEach((value, key, mapRef) => {
      calls.push([value, key, mapRef === m]);
    });

    expect(calls).toEqual([
      ["v1", "k1", true],
      ["v2", "k2", true],
    ]);
  });

  test("6) clear() empties the map, resets size, and returns null", () => {
    const m = new CustomMap();
    m.set("a", 1);
    m.set("b", 2);

    const ret = m.clear();
    expect(ret).toBeNull();
    expect(m.size()).toBe(0);
    expect(m.keys()).toEqual([]);
    expect(m.values()).toEqual([]);
    expect(m.entries()).toBeNull();
  });

  test("7) forEach() on empty map logs a warning and ignores the call", () => {
    const m = new CustomMap();
    const cb = jest.fn();
    m.forEach(cb);
    expect(console.warn).toHaveBeenCalledWith("Map is empty.");
    expect(cb).not.toHaveBeenCalled();
  });
});
