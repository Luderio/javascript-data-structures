const BinarySearchTree = require("../binary-search-tree");

// Silence console warnings during tests but allow assertions
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
 * 1. insert() places values correctly and search() finds them
 * 2. insert() duplicate value logs a warning and returns message
 * 3. min()/max() return null on empty tree; return node with correct value when non-empty
 * 4. search() on empty tree returns null and logs a warning
 * 5. isPresent() returns true when value exists and false when it does not
 * 6. delete() removes a leaf node
 * 7. delete() removes a node with one child and reconnects properly
 * 8. delete() removes a node with two children by replacing with inorder successor
 * 9. delete() updates the root when the root is removed
 * 10. delete() of non-existent value logs a warning and returns null
 */

describe("BinarySearchTree", () => {
  test("1) insert places values correctly and search finds them", () => {
    const bst = new BinarySearchTree();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(2);
    bst.insert(7);
    bst.insert(12);
    bst.insert(20);

    expect(bst.search(10)?.value).toBe(10);
    expect(bst.search(5)?.value).toBe(5);
    expect(bst.search(15)?.value).toBe(15);
    expect(bst.search(2)?.value).toBe(2);
    expect(bst.search(7)?.value).toBe(7);
    expect(bst.search(12)?.value).toBe(12);
    expect(bst.search(20)?.value).toBe(20);
  });

  test("2) insert duplicate logs a warning and returns message", () => {
    const bst = new BinarySearchTree();
    bst.insert(10);
    const res = bst.insert(10);
    expect(console.warn).toHaveBeenCalledWith(
      "The value you inserted: (10) already exists"
    );
    expect(res).toBe("The value you inserted: (10) already exists");
  });

  test("3) min/max return null on empty; return nodes with correct values when non-empty", () => {
    const empty = new BinarySearchTree();
    expect(empty.min()).toBeNull();
    expect(empty.max()).toBeNull();

    const bst = new BinarySearchTree();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(2);
    bst.insert(7);

    expect(bst.min()?.value).toBe(2);
    expect(bst.max()?.value).toBe(15);
  });

  test("4) search on empty returns null and logs a warning", () => {
    const bst = new BinarySearchTree();
    const res = bst.search(42);
    expect(res).toBeNull();
    expect(console.warn).toHaveBeenCalledWith("Tree has no nodes yet");
  });

  test("5) isPresent returns true for existing and false for missing values", () => {
    const bst = new BinarySearchTree();
    bst.insert(10);
    bst.insert(5);

    expect(bst.isPresent(10)).toBe(true);
    expect(bst.isPresent(5)).toBe(true);
    expect(bst.isPresent(999)).toBe(false);
  });

  test("6) delete removes a leaf node", () => {
    const bst = new BinarySearchTree();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(2); // leaf

    expect(bst.search(2)?.value).toBe(2);
    bst.delete(2);
    expect(bst.search(2)).toBeNull();
  });

  test("7) delete removes a node with one child and reconnects properly", () => {
    const bst = new BinarySearchTree();
    bst.insert(10);
    bst.insert(5);
    bst.insert(2); // 5 has one child (2)

    expect(bst.root.value).toBe(10);
    expect(bst.root.left.value).toBe(5);

    bst.delete(5);

    // 10's left should now be 2
    expect(bst.root.left.value).toBe(2);
    expect(bst.search(5)).toBeNull();
    expect(bst.search(2)?.value).toBe(2);
  });

  test("8) delete removes a node with two children using inorder successor", () => {
    const bst = new BinarySearchTree();
    // Build subtree under 10.left
    bst.insert(10);
    bst.insert(5);
    bst.insert(2);
    bst.insert(7);

    // Delete 5 -> successor should be 7
    bst.delete(5);
    expect(bst.root.left.value).toBe(7);
    expect(bst.search(5)).toBeNull();
    expect(bst.search(7)?.value).toBe(7);
  });

  test("9) delete updates the root when root is removed", () => {
    const bst = new BinarySearchTree();
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);
    bst.insert(12);
    bst.insert(20);

    // Delete root (10) -> successor should be 12
    expect(bst.root.value).toBe(10);
    bst.delete(10);
    expect(bst.root.value).toBe(12);
    expect(bst.search(10)).toBeNull();
    expect(bst.search(12)?.value).toBe(12);
  });

  test("10) delete of non-existent logs a warning and returns null", () => {
    const bst = new BinarySearchTree();
    bst.insert(10);
    bst.insert(5);
    const res = bst.delete(42);
    expect(res).toBeNull();
    expect(console.warn).toHaveBeenCalledWith(
      "The node that you're trying to delete (Node: 42) does not exists in this tree."
    );
  });
});
