const HashTable = require("../hash");

/**
 * Behaviors covered:
 * 1) get() returns undefined and has() returns false for missing keys
 * 2) set() stores and updates the value for an existing key
 * 3) has() returns false for existing keys whose value is falsy (e.g., 0), per current implementation
 * 4) Colliding keys (same hash) do not both get stored; get() for second key returns first key's value
 * 5) get() on a multi-item bucket returns an array and mutates keys due to assignment in filter (implementation quirk)
 * 6) delete() removes an existing single-item bucket entry
 * 7) keys(), values(), and entries() reflect stored data for non-colliding keys
 * 8) clear() resets the table to empty state
 */

describe("HashTable", () => {
  test("1) get() undefined and has() false for missing key", () => {
    const ht = new HashTable();
    expect(ht.get("missing")).toBeUndefined();
    expect(ht.has("missing")).toBe(false);
  });

  test("2) set() stores and updates existing key's value", () => {
    const ht = new HashTable();
    ht.set("a", "A");
    expect(ht.get("a")).toBe("A");

    ht.set("a", "B");
    expect(ht.get("a")).toBe("B");
  });

  test("3) has() returns false for existing key with falsy value (implementation behavior)", () => {
    const ht = new HashTable();
    ht.set("zero", 0);
    expect(ht.get("zero")).toBe(0);
    // Because has() checks truthiness of get(), falsy values are treated as missing
    expect(ht.has("zero")).toBe(false);
  });

  test("4) collision: second key with same hash but different key gets inserted in the same hash", () => {
    const ht = new HashTable();
    // 'ab' and 'ba' have same charCode sum => same hash with current _hash()
    ht.set("ab", "X");
    ht.set("ba", "Y");

    // Because the implementation never inserts a new pair in an existing bucket unless key matches,
    // the second set() call does not add a new entry. get() for 'ba' uses the sole bucket entry value.
    expect(ht.get("ba")).toBe("Y");

    const keys = ht.keys();
    expect(keys).toContain("ab");
    expect(keys).toContain("ba");
  });

  test("5) get() on multi-item bucket loops through the bucket and returns the item being searched", () => {
    const ht = new HashTable();

    ht.set("ab", "X");
    ht.set("ba", "Y");

    expect(ht.get("ba")).toBe("Y");
  });

  test("6) delete() removes an existing single-item entry", () => {
    const ht = new HashTable();
    ht.set("k", "v");
    expect(ht.get("k")).toBe("v");

    ht.delete("k");
    expect(ht.get("k")).toBeUndefined();
    expect(ht.has("k")).toBe(false);
  });

  test("7) keys(), values(), entries() reflect stored data for non-colliding keys", () => {
    const ht = new HashTable();
    ht.set("a", 1);
    ht.set("b", 2);

    // keys/values can be in any order depending on hash index; compare ignoring order
    const keys = ht.keys().sort();
    const values = ht.values().sort((x, y) => x - y);
    const entries = ht.entries();

    expect(keys).toEqual(["a", "b"].sort());
    expect(values).toEqual([1, 2]);

    // entries are [key, value]
    expect(entries.length).toBe(2);
    expect(entries).toEqual(
      expect.arrayContaining([
        ["a", 1],
        ["b", 2],
      ])
    );
  });

  test("8) clear() resets the table to empty state", () => {
    const ht = new HashTable();
    ht.set("a", 1);
    ht.set("b", 2);

    ht.clear();

    expect(ht.keys()).toEqual([]);
    expect(ht.values()).toEqual([]);
    expect(ht.entries()).toEqual([]);
    expect(ht.get("a")).toBeUndefined();
    expect(ht.has("b")).toBe(false);
  });
});
