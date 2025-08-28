const LinkedList = require("../linked-list");

// Silence console.info during tests and allow assertions on it
beforeAll(() => {
  jest.spyOn(console, "info").mockImplementation(() => {});
});

afterAll(() => {
  console.info.mockRestore();
});

beforeEach(() => {
  // Reset spy call counts between tests
  console.info.mockClear();
});

/**
 * Behaviors covered:
 * 1) New list is empty: isEmpty() true, length 0, and head() null
 * 2) insert() appends to tail; length increments; head remains the first inserted element
 * 3) search() returns node when element exists; returns null and logs when not found
 * 4) indexOf() returns index for existing; returns -1 for missing (no log)
 * 5) elementAt() returns element by index; returns -1 and logs for out-of-range
 * 6) insertAt(0, el) inserts at head and updates length
 * 7) insertAt(length, el) appends to tail
 * 8) deleteAt(index) removes element and updates head/length (non-edge indices)
 * 9) delete(value) returns null and logs when value not in list; deleting middle value works
 * 10) insertAt with invalid index (<0 or > length) logs and does not change the list
 * 11) deleteAt with invalid index (<0 or > length) logs and does not change the list
 * 12) search on empty returns null and logs
 * 13) indexOf on empty returns -1 and does not log
 * 14) elementAt on empty returns null and logs
 * 15) delete on empty returns null and logs
 * 16) insertAt on empty with index > 0 returns null and logs
 * 17) traverse visits all nodes including the last
 * 18) traverse on empty does nothing and does not log
 */

describe("LinkedList", () => {
  test("1) new list is empty (isEmpty, length, head)", () => {
    const list = new LinkedList();
    expect(list.isEmpty()).toBe(true);
    expect(list.length).toBe(0);
    expect(list.head()).toBeNull();
    expect(console.info).toHaveBeenCalledWith(
      "The linked list has no existing nodes yet."
    );
  });

  test("2) insert appends; length increments; head stays first", () => {
    const list = new LinkedList();
    list.insert("A");
    list.insert("B");
    list.insert("C");

    expect(list.length).toBe(3);

    const head = list.head();
    expect(head.element).toBe("A");
    expect(head.next.element).toBe("B");
    expect(head.next.next.element).toBe("C");
    expect(head.next.next.next).toBeNull();
  });

  test("3) search returns node when exists; null + log when not found", () => {
    const list = new LinkedList();
    list.insert("A");
    list.insert("B");

    const nodeB = list.search("B");
    expect(nodeB).toBeDefined();
    expect(nodeB.element).toBe("B");

    const notFound = list.search("Z");
    expect(notFound).toBeNull();
    expect(console.info).toHaveBeenCalledWith(
      "Element is not existing in the list"
    );
  });

  test("4) indexOf returns index for existing; -1 for missing (no log)", () => {
    const list = new LinkedList();
    list.insert("A");
    list.insert("B");
    list.insert("C");

    expect(list.indexOf("A")).toBe(0);
    expect(list.indexOf("B")).toBe(1);
    expect(list.indexOf("C")).toBe(2);

    const idx = list.indexOf("Z");
    expect(idx).toBe(-1);
    expect(console.info).not.toHaveBeenCalled();
  });

  test("5) elementAt returns element by index; -1 for out-of-range", () => {
    const list = new LinkedList();
    list.insert("A");
    list.insert("B");
    list.insert("C");

    expect(list.elementAt(0)).toBe("A");
    expect(list.elementAt(2)).toBe("C");

    // out-of-range
    expect(list.elementAt(-1)).toBe(-1);
    expect(list.elementAt(5)).toBe(-1);
  });

  test("6) insertAt(0, el) inserts at head and updates length", () => {
    const list = new LinkedList();
    list.insert("B");
    list.insert("C");

    list.insertAt(0, "A");

    expect(list.length).toBe(3);
    expect(list.head().element).toBe("A");
    expect(list.elementAt(1)).toBe("B");
  });

  test("7) insertAt(length, el) appends to tail", () => {
    const list = new LinkedList();
    list.insert("A");
    list.insert("B");

    // length is 2, inserting at index 2 appends
    list.insertAt(2, "C");

    expect(list.length).toBe(3);
    expect(list.elementAt(2)).toBe("C");
  });

  test("8) deleteAt removes element and updates head/length", () => {
    const list = new LinkedList();
    list.insert("A");
    list.insert("B");
    list.insert("C");

    list.deleteAt(1); // remove B
    expect(list.length).toBe(2);
    expect(list.elementAt(0)).toBe("A");
    expect(list.elementAt(1)).toBe("C");

    list.deleteAt(0); // remove A (head)
    expect(list.length).toBe(1);
    expect(list.head().element).toBe("C");
  });

  test("9) delete(value) logs + returns null when missing; deleting middle value works", () => {
    const list = new LinkedList();
    list.insert("Luderio");
    list.insert("Sanchez");
    list.insert("Ian");
    list.insert("Rusiana");
    list.insert("Hero");

    const res = list.delete("Chez");
    expect(res).toBeNull();
    expect(console.info).toHaveBeenCalledWith(
      "Element is not existing in the list"
    );

    // delete existing middle value
    list.delete("Ian");
    expect(list.length).toBe(4);
    expect(list.indexOf("Ian")).toBe(-1);
  });

  test("10) insertAt invalid index (<0 or > length) logs and no change", () => {
    const list = new LinkedList();
    list.insert("A");
    list.insert("B");

    const prevLength = list.length;
    const r1 = list.insertAt(-1, "X");
    const r2 = list.insertAt(5, "Y");

    expect(r1).toBeNull();
    expect(r2).toBeNull();

    expect(list.length).toBe(prevLength);
    expect(list.elementAt(0)).toBe("A");
  });

  test("11) deleteAt invalid index (<0 or > length) logs and no change", () => {
    const list = new LinkedList();
    list.insert("A");
    list.insert("B");

    const prevLength = list.length;
    const d1 = list.deleteAt(-1);
    const d2 = list.deleteAt(5);

    expect(d1).toBeNull();
    expect(d2).toBeNull();

    expect(list.length).toBe(prevLength);
  });

  test("12) search on empty returns null and logs", () => {
    const list = new LinkedList();
    const res = list.search("X");
    expect(res).toBeNull();
    expect(console.info).toHaveBeenCalledWith(
      "The linked list has no existing nodes yet."
    );
  });

  test("13) indexOf on empty returns -1 and does not log", () => {
    const list = new LinkedList();
    const idx = list.indexOf("X");
    expect(idx).toBe(-1);
    expect(console.info).not.toHaveBeenCalled();
  });

  test("14) elementAt on empty returns null and logs", () => {
    const list = new LinkedList();
    const val = list.elementAt(0);
    expect(val).toBeNull();
    expect(console.info).toHaveBeenCalledWith(
      "The linked list has no existing nodes yet."
    );
  });

  test("15) delete on empty returns null and logs", () => {
    const list = new LinkedList();
    const out = list.delete("X");
    expect(out).toBeNull();
    expect(console.info).toHaveBeenCalledWith(
      "The linked list has no existing nodes yet."
    );
  });

  test("16) insertAt on empty with index > 0 returns null and logs", () => {
    const list = new LinkedList();
    const out = list.insertAt(1, "X");
    expect(out).toBeNull();
    expect(console.info).toHaveBeenCalledWith(
      "The linked list has no existing nodes yet."
    );
  });

  test("17) traverse visits all nodes including the last", () => {
    const list = new LinkedList();
    list.insert("A");
    list.insert("B");
    list.insert("C");
    const visited = [];
    list.traverse((el) => visited.push(el));
    expect(visited).toEqual(["A", "B", "C"]);
  });

  test("18) traverse on empty does nothing and does not log", () => {
    const list = new LinkedList();
    const fn = jest.fn();
    list.traverse(fn);
    expect(fn).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
  });
});
