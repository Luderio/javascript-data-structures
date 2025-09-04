const Heap = require("../binary-heap");

// Silence console errors during tests but allow assertions
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Behaviors covered:
 * 1. heapify("min") builds a valid min-heap and peek() returns the minimum
 * 2. heapify("max") builds a valid max-heap and peek() returns the maximum
 * 3. extract() returns the root and preserves heap type across operations
 * 4. replace() replaces the root, re-heapifies, and preserves heap type
 * 5. insert() only appends; peek() is undefined before heapify, defined after
 * 6. heapify() with invalid type logs error and returns undefined
 * 7. extract() on an empty heap returns undefined and does not throw
 * 8. heapify() accepts synonyms: "minimum" and "maximum"
 * 9. heapify() is case-insensitive (e.g., "MiN", "MaX")
 */

describe("BinaryHeap", () => {
  const input = [20, 19, 17, 13, 15, 8, 5, 11, 9, 10];

  const isValidMinHeap = (arr) => {
    // arr[0] is expected to be null per implementation; heap starts at index 1
    for (let i = 1; i < arr.length; i++) {
      const left = 2 * i;
      const right = 2 * i + 1;
      if (left < arr.length) {
        expect(arr[i]).toBeLessThanOrEqual(arr[left]);
      }
      if (right < arr.length) {
        expect(arr[i]).toBeLessThanOrEqual(arr[right]);
      }
    }
  };

  const isValidMaxHeap = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      const left = 2 * i;
      const right = 2 * i + 1;
      if (left < arr.length) {
        expect(arr[i]).toBeGreaterThanOrEqual(arr[left]);
      }
      if (right < arr.length) {
        expect(arr[i]).toBeGreaterThanOrEqual(arr[right]);
      }
    }
  };

  test('1) heapify("min") builds a valid min-heap and peek() returns the minimum', () => {
    const h = new Heap();
    input.forEach((x) => h.insert(x));

    const out = h.heapify("min");

    expect(Array.isArray(out)).toBe(true);
    expect(out[0]).toBeNull(); // implementation stores null at index 0
    expect(h.peek()).toBe(Math.min(...input));
    isValidMinHeap(out);
  });

  test('2) heapify("max") builds a valid max-heap and peek() returns the maximum', () => {
    const h = new Heap();
    input.forEach((x) => h.insert(x));

    const out = h.heapify("max");

    expect(Array.isArray(out)).toBe(true);
    expect(out[0]).toBeNull();
    expect(h.peek()).toBe(Math.max(...input));
    isValidMaxHeap(out);
  });

  test("3) extract() returns the root and preserves heap type across operations (min)", () => {
    const h = new Heap();
    input.forEach((x) => h.insert(x));
    h.heapify("min");

    const sortedAsc = [...input].sort((a, b) => a - b);

    const first = h.extract();
    expect(first).toBe(sortedAsc[0]);
    const second = h.peek();
    expect(second).toBe(sortedAsc[1]);

    // Extract again to ensure heap property is maintained
    const secondExtract = h.extract();
    expect(secondExtract).toBe(sortedAsc[1]);
    expect(h.peek()).toBe(sortedAsc[2]);
  });

  test("4) replace() replaces the root, re-heapifies, and preserves heap type (max)", () => {
    const h = new Heap();
    input.forEach((x) => h.insert(x));
    h.heapify("max");

    const sortedDesc = [...input].sort((a, b) => b - a);
    const secondMax = sortedDesc[1];
    const replacement = 16;

    const out = h.replace(replacement);

    // After replacing the root in a max-heap, new root is max(secondMax, replacement)
    expect(h.peek()).toBe(Math.max(secondMax, replacement));

    // Validate heap structure still holds for max-heap
    expect(Array.isArray(out)).toBe(true);
    expect(out[0]).toBeNull();
    isValidMaxHeap(out);

    // Extract once to ensure type persistence
    const e = h.extract();
    // e should be the maximum of the current heap after replace
    // which is h.peek() prior to this extract call
    expect(typeof e).toBe("number");
    isValidMaxHeap(h.output);
  });

  test("5) insert() only appends; peek() undefined before heapify, defined after", () => {
    const h = new Heap();
    input.forEach((x) => h.insert(x));
    expect(h.peek()).toBeUndefined();

    h.heapify("min");
    expect(h.peek()).toBe(Math.min(...input));
  });

  test("6) heapify() with invalid type logs error and returns undefined", () => {
    const h = new Heap();
    input.forEach((x) => h.insert(x));

    const result = h.heapify("invalid-type");
    expect(console.error).toHaveBeenCalledWith(
      "Type must be min/minimum or max/maximum"
    );
    expect(result).toBeUndefined();
  });

  test("7) extract() on an empty heap returns undefined and does not throw", () => {
    const h = new Heap();
    expect(() => h.extract()).not.toThrow();
    expect(h.extract()).toBeUndefined();
  });

  test('8) heapify() accepts synonyms: "minimum" and "maximum"', () => {
    const h1 = new Heap();
    input.forEach((x) => h1.insert(x));
    h1.heapify("minimum");
    expect(h1.peek()).toBe(Math.min(...input));

    const h2 = new Heap();
    input.forEach((x) => h2.insert(x));
    h2.heapify("maximum");
    expect(h2.peek()).toBe(Math.max(...input));
  });

  test('9) heapify() is case-insensitive (e.g., "MiN", "MaX")', () => {
    const h1 = new Heap();
    input.forEach((x) => h1.insert(x));
    h1.heapify("MiN");
    expect(h1.peek()).toBe(Math.min(...input));

    const h2 = new Heap();
    input.forEach((x) => h2.insert(x));
    h2.heapify("MaX");
    expect(h2.peek()).toBe(Math.max(...input));
  });
});
