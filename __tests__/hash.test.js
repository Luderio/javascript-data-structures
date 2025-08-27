const HashTable = require("../hash");

/**
 * Behaviors covered:
 * 1) get() returns undefined and has() returns false for missing keys
 * 2) set() stores and updates existing key's value and increment the size property
 * 3) has() returns true if the key is found false otherwise
 * 4) collision: second key with same hash but different key gets inserted in the same index
 * 5) get() on multi-item bucket loops through the bucket and returns the item being searched
 * 6) delete() removes an existing single-item entry and decreases the size property
 * 7) keys(), values(), entries() reflect stored data
 * 8) clear() resets the table to empty state and sets the size property to 0
 */

describe("HashTable", () => {
  test("1) get() undefined and has() false for missing key", () => {
    const ht = new HashTable();
    expect(ht.get("missing")).toBeUndefined();
    expect(ht.has("missing")).toBe(false);
  });

  test("2) set() stores and updates existing key's value and increment the size property", () => {
    const ht = new HashTable();

    ht.set("a", "A");
    expect(ht.get("a")).toBe("A");
    expect(ht.size).toBe(1);

    ht.set("a", "B");
    expect(ht.get("a")).toBe("B");
    expect(ht.size).toBe(1);
  });

  test("3) has() returns true if the key is found false otherwise", () => {
    const ht = new HashTable();

    ht.set("zero", 0);
    expect(ht.get("zero")).toBe(0);
    expect(ht.has("zero")).toBe(true);
  });

  test("4) collision: second key with same hash but different key gets inserted in the same index", () => {
    const ht = new HashTable();
    // 'ab' and 'ba' have same charCode sum => same hash.
    ht.set("ab", "X");
    ht.set("ba", "Y");

    expect(ht.get("ba")).toBe("Y");

    const keys = ht.keys();
    expect(keys).toContain("ab");
    expect(keys).toContain("ba");
  });

  test("5) get() on multi-item bucket loops through the bucket and returns the item being searched", () => {
    const ht = new HashTable();

    // 'ab' and 'ba' have same charCode sum => same hash. Get's stored on the same index.
    ht.set("ab", "X");
    ht.set("ba", "Y");

    // loops through the hash index and finds and returns the data.
    expect(ht.get("ba")).toBe("Y");
  });

  test("6) delete() removes an existing single-item entry and decreases the size property", () => {
    const ht = new HashTable();
    ht.set("k", "v");
    ht.set("hello", "world");
    expect(ht.get("k")).toBe("v");
    expect(ht.size).toBe(2);

    ht.delete("k");
    expect(ht.get("k")).toBeUndefined();
    expect(ht.has("k")).toBe(false);
    expect(ht.size).toBe(1);
  });

  test("7) keys(), values(), entries() reflect stored data", () => {
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

  test("8) clear() resets the table to empty state and sets the size property to 0", () => {
    const ht = new HashTable();
    ht.set("a", 1);
    ht.set("b", 2);
    expect(ht.size).toBe(2);

    ht.clear();

    expect(ht.keys()).toEqual([]);
    expect(ht.values()).toEqual([]);
    expect(ht.entries()).toEqual([]);
    expect(ht.get("a")).toBeUndefined();
    expect(ht.has("b")).toBe(false);
    expect(ht.size).toBe(0);
  });
});
